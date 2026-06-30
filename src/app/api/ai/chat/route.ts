import { NextRequest, NextResponse } from "next/server";
import { getZAI, buildRwandaKnowledge } from "@/lib/ai";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM_FALLBACK =
  "You are the Visit Rwanda AI concierge. Be concise, accurate and warm. Use markdown.";

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
    const zai = await getZAI();

    // Persist the user message (best-effort)
    try {
      await db.chatMessage.create({
        data: { sessionId, role: "user", content: message },
      });
    } catch {
      /* ignore db errors */
    }

    const messages: Array<{ role: string; content: string }> = [
      { role: "assistant", content: system },
      ...history.map((h) => ({
        role: h.role === "user" ? "user" : "assistant",
        content: h.content,
      })),
      { role: "user", content: message },
    ];

    const completion = await zai.chat.completions.create({
      messages: messages as any,
      thinking: { type: "disabled" },
    });

    const reply =
      completion?.choices?.[0]?.message?.content?.trim() ||
      "I'm sorry, I couldn't generate a response. Please try rephrasing your question.";

    // Persist the assistant reply (best-effort)
    try {
      await db.chatMessage.create({
        data: { sessionId, role: "assistant", content: reply },
      });
    } catch {
      /* ignore */
    }

    return NextResponse.json({ success: true, reply, persona });
  } catch (err: any) {
    console.error("[/api/ai/chat] error:", err?.message);
    return NextResponse.json(
      { success: false, error: "The concierge is briefly unavailable. Please try again.", reply: null },
      { status: 500 }
    );
  }
}
