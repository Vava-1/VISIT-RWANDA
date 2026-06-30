import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

// POST /api/analytics: anonymous engagement events for self healing signals.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const type = (body.type || "view").toString().slice(0, 40);
    const target = (body.target || "").toString().slice(0, 300);
    const sessionId = (body.sessionId || "anon").toString().slice(0, 120);
    const meta = body.meta ? JSON.stringify(body.meta).slice(0, 1000) : null;

    await db.analyticsEvent.create({
      data: { type, target, sessionId, meta },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    // analytics must never break UX
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
