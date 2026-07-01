import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Live web search is not included in the free Gemini tier. This endpoint
// returns a graceful, curated response so the Realtime Hub shows the featured
// events and a friendly note instead of an error. All other curated content on
// the page (destinations, institutions, health, community) is unaffected.

const TOPIC_LABELS: Record<string, string> = {
  news: "Rwanda news",
  tourism: "Rwanda tourism updates",
  business: "Rwanda business and investment",
  sports: "Rwanda sports",
  events: "Rwanda events and festivals",
  travel: "Rwanda travel advisories",
};

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const topic = (sp.get("topic") || "news").toString();

  return NextResponse.json({
    success: true,
    topic,
    results: [],
    generatedAt: new Date().toISOString(),
    note: `${TOPIC_LABELS[topic] || "Live updates"}: explore the curated featured events below, and ask RWANDA (the AI concierge) for the latest guidance on any topic.`,
  });
}
