import { NextRequest, NextResponse } from "next/server";
import { getZAI } from "@/lib/ai";

export const runtime = "nodejs";
export const maxDuration = 60;

// Map friendly topics to search queries scoped to Rwanda.
const TOPIC_QUERIES: Record<string, string> = {
  news: "Rwanda latest news this week",
  tourism: "Rwanda tourism news 2024 2025",
  business: "Rwanda business investment news",
  sports: "Rwanda football cycling sports news",
  events: "Rwanda events festivals 2025",
  travel: "Rwanda travel advisory safety 2025",
};

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const topic = (sp.get("topic") || "news").toString();
    const q = (sp.get("q") || "").toString().trim();
    const num = Math.min(parseInt(sp.get("num") || "8"), 12);

    const query = q || TOPIC_QUERIES[topic] || TOPIC_QUERIES.news;
    const zai = await getZAI();

    let results: any[];
    try {
      results = await zai.functions.invoke("web_search", { query, num });
    } catch (innerErr: any) {
      // The web_search function is only available on the internal Z.ai platform.
      // On the public API (api.z.ai) it returns an error. Return an empty
      // success response so the frontend shows a graceful "no results" state
      // rather than an error.
      console.error("[/api/search] web_search unavailable:", innerErr?.message);
      return NextResponse.json({
        success: true,
        topic,
        query,
        results: [],
        generatedAt: new Date().toISOString(),
        note: "Live web search is available in the full environment. Browse the curated content on this page instead.",
      });
    }

    const cleaned = (Array.isArray(results) ? results : []).map((r: any) => ({
      title: r.name || r.title || "Untitled",
      url: r.url || r.link || "",
      snippet: r.snippet || "",
      source: r.host_name || r.displayLink || "",
      date: r.date || "",
    }));

    return NextResponse.json({
      success: true,
      topic,
      query,
      results: cleaned,
      generatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("[/api/search] error:", err?.message);
    return NextResponse.json(
      { success: false, error: "Live search is briefly unavailable.", results: [] },
      { status: 502 }
    );
  }
}
