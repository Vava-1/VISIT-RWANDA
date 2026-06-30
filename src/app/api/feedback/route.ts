import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

// POST /api/feedback — powers the self-healing & trust loop.
// Users report issues, suggest features, correct data, or praise.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const category = (body.category || "suggest").toString().slice(0, 40);
    const message = (body.message || "").toString().slice(0, 4000);
    const url = (body.url || "").toString().slice(0, 500);
    const sessionId = (body.sessionId || "anon").toString().slice(0, 120);

    if (!message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const fb = await db.feedback.create({
      data: { category, message, url, sessionId },
    });

    return NextResponse.json({ success: true, id: fb.id });
  } catch (err: any) {
    console.error("[/api/feedback] error:", err?.message);
    return NextResponse.json({ error: "Could not save feedback" }, { status: 500 });
  }
}
