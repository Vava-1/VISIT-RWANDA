import {
  ECONOMY_STATS, QUICK_FACTS, DESTINATIONS, INVESTMENT_SECTORS,
  EDUCATION_INSTITUTIONS, SPORTS_INSTITUTIONS, ARTS_INSTITUTIONS,
  TOURISM_SERVICES, INVESTMENT_OPPORTUNITIES,
  HEALTH_FACILITIES, COMMUNITY_LIFE, HEALTH_TIPS,
  CITIES, TRANSPORT,
} from "./rwanda-data";

// Groq API (OpenAI-compatible): free tier, no credit card needed.
// 30 requests/min, 14,400 requests/day on Llama 3.3 70B.
// Get a free API key at https://console.groq.com/keys
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export type ChatMessage = { role: "user" | "assistant"; content: string };

/**
 * Generate a reply using Groq (Llama 3.3 70B).
 * Groq's API is OpenAI-compatible, so we call it directly with fetch.
 *
 * @param messages  Conversation history (user + assistant turns).
 * @param system    The system prompt (Rwanda knowledge pack).
 * @returns         The model's reply text.
 */
export async function generateReply(
  messages: ChatMessage[],
  system: string
): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error(
      "GROQ_API_KEY is not set. Get a free key at https://console.groq.com/keys and add it to your environment variables."
    );
  }

  // Build the OpenAI-compatible messages array.
  const apiMessages = [
    { role: "system", content: system },
    ...messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  ];

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Groq API error (${response.status}): ${errorBody.slice(0, 500)}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("Groq returned an empty response.");
  }
  return text.trim();
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

