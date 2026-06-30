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

    const results: any[] = await zai.functions.invoke("web_search", {
      query,
      num,
    });

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
