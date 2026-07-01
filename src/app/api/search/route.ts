import { NextRequest, NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

// Real-time Rwanda news via free RSS feeds (no API key needed).
// Sources: Google News (aggregates many sources) + KT Press (local Rwandan).
const TOPIC_QUERIES: Record<string, string> = {
  news: "Rwanda",
  tourism: "Rwanda tourism",
  business: "Rwanda business investment",
  sports: "Rwanda sport football cycling",
  events: "Rwanda events festival",
  travel: "Rwanda travel advisory",
};

const LOCAL_FEEDS = [
  "https://ktpress.rw/feed/",
];

type NewsItem = {
  title: string;
  url: string;
  snippet: string;
  source: string;
  date: string;
};

function stripHtml(s: string): string {
  return s
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

async function fetchGoogleNews(topic: string, num: number): Promise<NewsItem[]> {
  const q = encodeURIComponent(TOPIC_QUERIES[topic] || "Rwanda");
  const url = `https://news.google.com/rss/search?q=${q}+when:7d&hl=en-US&gl=US&ceid=US:en`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; VisitRwanda/1.0)" },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const parser = new XMLParser({ ignoreAttributes: false });
    const parsed: any = parser.parse(xml);
    const items = parsed?.rss?.channel?.item;
    if (!items) return [];
    const list = Array.isArray(items) ? items : [items];
    return list.slice(0, num).map((it: any) => {
      const title = stripHtml(it.title || "");
      // Google News titles are "Headline - Source", split them.
      const dashIdx = title.lastIndexOf(" - ");
      const realTitle = dashIdx > 0 ? title.slice(0, dashIdx) : title;
      const sourceName = dashIdx > 0 ? title.slice(dashIdx + 3) : "Google News";
      return {
        title: realTitle,
        url: it.link || "",
        snippet: stripHtml(it.description || "").slice(0, 200),
        source: sourceName,
        date: it.pubDate ? new Date(it.pubDate).toISOString() : "",
      };
    });
  } catch {
    return [];
  }
}

async function fetchLocalFeeds(num: number): Promise<NewsItem[]> {
  const results: NewsItem[] = [];
  for (const feedUrl of LOCAL_FEEDS) {
    try {
      const res = await fetch(feedUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; VisitRwanda/1.0)" },
        signal: AbortSignal.timeout(12000),
      });
      if (!res.ok) continue;
      const xml = await res.text();
      const parser = new XMLParser({ ignoreAttributes: false });
      const parsed: any = parser.parse(xml);
      const items = parsed?.rss?.channel?.item;
      if (!items) continue;
      const list = Array.isArray(items) ? items : [items];
      for (const it of list.slice(0, num)) {
        results.push({
          title: stripHtml(it.title || ""),
          url: it.link || "",
          snippet: stripHtml(it.description || "").slice(0, 200),
          source: "KT Press",
          date: it.pubDate ? new Date(it.pubDate).toISOString() : "",
        });
      }
    } catch {
      /* skip this feed */
    }
  }
  return results;
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const topic = (sp.get("topic") || "news").toString();
  const num = Math.min(parseInt(sp.get("num") || "8"), 12);

  try {
    // Fetch Google News (topic-specific) + local Rwandan feeds in parallel.
    const [googleItems, localItems] = await Promise.all([
      fetchGoogleNews(topic, 15),
      fetchLocalFeeds(8),
    ]);

    // Merge, dedupe by title, then interleave Google News (topic-specific)
    // with local Rwandan feeds so both sources are represented.
    const seen = new Set<string>();
    const deduped = [...googleItems, ...localItems].filter((item) => {
      const key = item.title.toLowerCase().slice(0, 60);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Interleave: take one from Google News, one from local, repeat.
    const googleDeduped = deduped.filter((r) => r.source !== "KT Press");
    const localDeduped = deduped.filter((r) => r.source === "KT Press");
    const all: NewsItem[] = [];
    let gi = 0, li = 0;
    while (all.length < num && (gi < googleDeduped.length || li < localDeduped.length)) {
      if (gi < googleDeduped.length) all.push(googleDeduped[gi++]);
      if (all.length >= num) break;
      if (li < localDeduped.length) all.push(localDeduped[li++]);
    }

    return NextResponse.json({
      success: true,
      topic,
      results: all,
      generatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("[/api/search] error:", err?.message);
    return NextResponse.json(
      { success: false, error: "Live news is briefly unavailable.", results: [] },
      { status: 200 }
    );
  }
}
