import { NextRequest, NextResponse } from "next/server";
import { generateReply, buildRwandaKnowledge } from "@/lib/ai";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const message: string = (body.message ?? "").toString().slice(0, 2000);
    const persona: string = (body.persona ?? "tourist").toString();
    const sessionId: string = (body.sessionId ?? "anon").toString();
    const history: Array<{ role: string; content: string }> = Array.isArray(body.history)
      ? body.history.slice(-8)
      : [];

    if (!message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const system = buildRwandaKnowledge(persona);

    // Persist the user message (best-effort). DB is optional on serverless.
    try {
      if (db) {
        await db.chatMessage.create({
          data: { sessionId, role: "user", content: message },
        });
      }
    } catch (e) {
      /* ignore db errors - DB is optional on Vercel */
    }

    // Build conversation history (without the system prompt, which is passed
    // separately to Gemini as systemInstruction).
    const messages = [
      ...history.map((h) => ({
        role: (h.role === "user" ? "user" : "assistant") as "user" | "assistant",
        content: h.content,
      })),
      { role: "user" as const, content: message },
    ];

    const reply = await generateReply(messages, system);

    // Persist the assistant reply (best-effort)
    try {
      if (db) {
        await db.chatMessage.create({
          data: { sessionId, role: "assistant", content: reply },
        });
      }
    } catch (e) {
      /* ignore */
    }

    return NextResponse.json({ success: true, reply, persona });
  } catch (err: any) {
    const msg = err?.message || String(err);
    console.error("[/api/ai/chat] error:", msg);
    return NextResponse.json(
      { success: false, error: msg, reply: null },
      { status: 500 }
    );
  }
}
