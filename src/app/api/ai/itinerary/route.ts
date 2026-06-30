import { NextRequest, NextResponse } from "next/server";
import { getZAI, buildRwandaKnowledge } from "@/lib/ai";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const days: number = Math.min(Math.max(parseInt(body.days) || 5, 1), 21);
    const interests: string = (body.interests ?? "wildlife, culture, nature").toString().slice(0, 400);
    const persona: string = (body.persona ?? "tourist").toString();
    const budget: string = (body.budget ?? "mid-range").toString();
    const sessionId: string = (body.sessionId ?? "anon").toString();

    const system = buildRwandaKnowledge(persona);
    const zai = await getZAI();

    const prompt = `Create a detailed ${days}-day Rwanda travel itinerary for a ${persona}.
Interests: ${interests}.
Budget level: ${budget}.

Return STRICT markdown with this structure:
## Day 1 — <Title>
**Morning:** ...
**Afternoon:** ...
**Evening:** ...
**Stay:** suggested accommodation area

Include 1 realistic highlight per day, mention travel times between locations, and respect Rwanda's geography (Kigali → Musanze/Volcanoes is ~2.5h; Kigali → Akagera is ~2.5h; Kigali → Nyungwe is ~5-6h; Lake Kivu towns along the west). End with a "## Practical Tips" section with visa, currency and seasonal notes. Keep it skimmable and inspiring.`;

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: system },
        { role: "assistant", content: "You are also an expert trip planner for Rwanda. Produce realistic, well-paced itineraries." },
        { role: "user", content: prompt },
      ] as any,
      thinking: { type: "disabled" },
    });

    const itinerary =
      completion?.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I couldn't build that itinerary right now. Please try again.";

    const title = `${days}-Day Rwanda Journey — ${persona}`;
    try {
      await db.itinerary.create({
        data: { sessionId, title, days, content: itinerary },
      });
    } catch {
      /* ignore */
    }

    return NextResponse.json({ success: true, itinerary, title });
  } catch (err: any) {
    console.error("[/api/ai/itinerary] error:", err?.message);
    return NextResponse.json(
      { success: false, error: "Itinerary generation failed. Please try again." },
      { status: 500 }
    );
  }
}
