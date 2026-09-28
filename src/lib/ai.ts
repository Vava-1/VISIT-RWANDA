import {
  ECONOMY_STATS, QUICK_FACTS, DESTINATIONS, INVESTMENT_SECTORS,
  EDUCATION_INSTITUTIONS, SPORTS_INSTITUTIONS, ARTS_INSTITUTIONS,
  TOURISM_SERVICES, INVESTMENT_OPPORTUNITIES,
  HEALTH_FACILITIES, COMMUNITY_LIFE, HEALTH_TIPS,
  CITIES, TRANSPORT,
} from "./rwanda-data";

// Google Gemini via the Generative Language API (free tier, no credit card).
// Get an API key at https://aistudio.google.com/apikey
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Gemini returns 503 while a model is cold or capacity is tight, so retry
// those a couple of times before surfacing an error to the visitor.
const MAX_ATTEMPTS = 3;
const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);

export type ChatMessage = { role: "user" | "assistant"; content: string };

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function requestOnce(body: string): Promise<string> {
  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": GEMINI_API_KEY as string,
    },
    body,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    const error = new Error(
      `Gemini API error (${response.status}): ${errorBody.slice(0, 500)}`
    ) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  const parts = data?.candidates?.[0]?.content?.parts;
  const text = Array.isArray(parts)
    ? parts.map((p: { text?: string }) => p?.text ?? "").join("")
    : "";

  if (!text) {
    const blocked = data?.promptFeedback?.blockReason;
    throw new Error(
      blocked
        ? `Gemini blocked the request (${blocked}).`
        : "Gemini returned an empty response."
    );
  }
  return text.trim();
}

/**
 * Generate a reply using Gemini.
 * Called over plain REST so the project keeps a zero-dependency AI layer.
 *
 * @param messages  Conversation history (user + assistant turns).
 * @param system    The system prompt (Rwanda knowledge pack).
 * @returns         The model's reply text.
 */
export async function generateReply(
  messages: ChatMessage[],
  system: string
): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is not set. Get a free key at https://aistudio.google.com/apikey and add it to your environment variables."
    );
  }

  // Gemini calls the assistant turn "model" and takes the system prompt as a
  // separate systemInstruction, so it stays out of the contents array.
  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: system }] },
    contents: messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    // Gemini 3 manages its own sampling, so temperature is deliberately omitted.
    generationConfig: { maxOutputTokens: 2048 },
  });

  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await requestOnce(body);
    } catch (err: any) {
      lastError = err;
      if (attempt === MAX_ATTEMPTS || !RETRYABLE_STATUSES.has(err?.status)) {
        throw err;
      }
      await sleep(400 * attempt);
    }
  }
  throw lastError;
}

// A compact knowledge pack injected into the system prompt so the concierge
// always answers with accurate, up-to-date Rwanda context.
export function buildRwandaKnowledge(persona?: string): string {
  const dest = DESTINATIONS.map(
    (d) => `- ${d.name} (${d.category}, ${d.region})`
  ).join("\n");
  const sectors = INVESTMENT_SECTORS.map(
    (s) => `- ${s.name}`
  ).join("\n");

  // Summarise institutions by listing just names — the user can browse details
  // on the platform. The AI gives general guidance and key facts.
  const instNames = (list: any[]) => list.map((i) => i.name).join(", ");
  const cityNames = CITIES.map((c) => c.name).join(", ");
  const transportNames = TRANSPORT.map((t) => `${t.name} (${t.type})`).join(", ");

  return `You are "RWANDA", the official AI concierge of the Visit Rwanda platform. If anyone asks your name, your name is RWANDA.

ABOUT RWANDA:
- Capital: ${QUICK_FACTS.capital}; nickname: "Land of a Thousand Hills"; population ${QUICK_FACTS.population}.
- Languages: ${QUICK_FACTS.languages}. Currency: ${QUICK_FACTS.currency}. Motto: "${QUICK_FACTS.motto}".
- GDP 2024: ${ECONOMY_STATS.gdp2024}; growth ${ECONOMY_STATS.gdpGrowth}. Tourism: ${ECONOMY_STATS.tourismGdp} of GDP.

KEY DESTINATIONS: ${dest}

INVESTMENT SECTORS: ${sectors}

CITIES: ${cityNames}

TRANSPORT OPTIONS: ${transportNames}. Moto-taxis are everywhere (from RWF 300). Intercity buses (Volcano Express, Ritco) from Nyabugogo bus park in Kigali. Yego is the ride-hailing app. Car hire with driver recommended for parks (from US$ 80/day).

INSTITUTIONS ON THE PLATFORM (browse for details):
- Education: ${instNames(EDUCATION_INSTITUTIONS)}
- Sports: ${instNames(SPORTS_INSTITUTIONS)}
- Arts: ${instNames(ARTS_INSTITUTIONS)}
- Tourism services (hotels, lodges, operators): ${instNames(TOURISM_SERVICES)}
- Investment opportunities: ${instNames(INVESTMENT_OPPORTUNITIES)}
- Health facilities: ${instNames(HEALTH_FACILITIES)}
- Community: Umuganda (last Saturday monthly), Car Free Day (Sundays), Kwita Izina, Kwibuka (7 April), Liberation Day (4 July), Umuganura (1 Aug)

TRAVEL ESSENTIALS:
- Visa on arrival US$ 50 / 30 days; African Union nationals visa-free.
- Yellow fever certificate if from endemic zones.
- Gorilla permits about US$ 1,500. Emergency: 112 (police), 114 (ambulance).
- Plastic bags banned.

BEHAVIOUR RULES:
- Tailor answers to persona: ${persona || "general visitor"}.
- Be concise, warm, accurate. Use markdown.
- For specific institution details (fees, contacts), give what you know and tell users to browse the platform directory for full info.
- Do NOT use em dashes. Write like a real Rwandan expert, not an AI.`;
}

