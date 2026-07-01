import { GoogleGenAI } from "@google/genai";
import {
  ECONOMY_STATS, QUICK_FACTS, DESTINATIONS, INVESTMENT_SECTORS,
  EDUCATION_INSTITUTIONS, SPORTS_INSTITUTIONS, ARTS_INSTITUTIONS,
  TOURISM_SERVICES, INVESTMENT_OPPORTUNITIES,
  HEALTH_FACILITIES, COMMUNITY_LIFE, HEALTH_TIPS,
} from "./rwanda-data";

// Google Gemini 2.0 Flash: free tier (15 req/min, 1500 req/day, no credit card).
// Requires GEMINI_API_KEY env var (get one free at https://aistudio.google.com/apikey).
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

let geminiInstance: GoogleGenAI | null = null;

function getGemini(): GoogleGenAI {
  if (!geminiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is not set. Get a free key at https://aistudio.google.com/apikey and add it to your environment variables."
      );
    }
    geminiInstance = new GoogleGenAI({ apiKey });
  }
  return geminiInstance;
}

export type ChatMessage = { role: "user" | "assistant"; content: string };

/**
 * Generate a reply using Gemini 2.0 Flash.
 * @param messages  Conversation history (user + assistant turns). The system
 *                  prompt is passed separately via `systemInstruction`.
 * @param system    The system instruction (Rwanda knowledge pack).
 * @returns         The model's reply text.
 */
export async function generateReply(
  messages: ChatMessage[],
  system: string
): Promise<string> {
  const ai = getGemini();

  // Gemini uses role "model" for assistant turns.
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents,
    config: {
      systemInstruction: system,
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }
  return text.trim();
}

// A compact knowledge pack injected into the system prompt so the concierge
// always answers with accurate, up-to-date Rwanda context.
export function buildRwandaKnowledge(persona?: string): string {
  const dest = DESTINATIONS.map(
    (d) => `- ${d.name} (${d.category}, ${d.region}): ${d.tagline}`
  ).join("\n");
  const sectors = INVESTMENT_SECTORS.map(
    (s) => `- ${s.name}: ${s.whyRwanda}`
  ).join("\n");

  // Detailed institution knowledge so RWANDA can answer specific questions.
  const fmtInstitutions = (list: any[], label: string) =>
    `${label}:\n` +
    list
      .map(
        (i) =>
          `- ${i.name} [${i.category}], ${i.location}. ${i.description} Fees: ${i.fees || "n/a"}. Contact: ${i.contact || "n/a"}. Web: ${i.website || "n/a"}.`
      )
      .join("\n");

  const education = fmtInstitutions(EDUCATION_INSTITUTIONS, "EDUCATION INSTITUTIONS (nursery to university, TVET, research)");
  const sports = fmtInstitutions(SPORTS_INSTITUTIONS, "SPORTS (clubs, stadiums, events, national teams)");
  const arts = fmtInstitutions(ARTS_INSTITUTIONS, "ARTS & CREATIVE (galleries, festivals, studios, brands, hubs)");
  const tourismSvc = fmtInstitutions(TOURISM_SERVICES, "TOURISM SERVICES (lodges, hotels, operators, official permits)");
  const investOpps = fmtInstitutions(INVESTMENT_OPPORTUNITIES, "INVESTMENT OPPORTUNITIES (zones, funds, official services)");

  // Health facilities + community life
  const health = fmtInstitutions(HEALTH_FACILITIES, "HEALTH FACILITIES (hospitals, clinics, pharmacies by location)");
  const community =
    "COMMUNITY LIFE & NATIONAL DAYS:\n" +
    COMMUNITY_LIFE.map(
      (c) => `- ${c.name} [${c.kind}], ${c.frequency}. ${c.description} Impact: ${c.impact}`
    ).join("\n");
  const healthTips =
    "VISITOR HEALTH TIPS:\n" + HEALTH_TIPS.map((t) => `- ${t.title}: ${t.text}`).join("\n");

  return `You are "RWANDA", the official AI concierge of the Visit Rwanda platform: an expert, warm and trustworthy digital guide to the Republic of Rwanda. If anyone asks your name, your name is RWANDA.

ABOUT RWANDA (verified):
- Official name: ${QUICK_FACTS.officialName}; capital: ${QUICK_FACTS.capital}; nickname: "${QUICK_FACTS.nickname}".
- Population ${QUICK_FACTS.population}; area ${QUICK_FACTS.area}; languages: ${QUICK_FACTS.languages}.
- Currency: ${QUICK_FACTS.currency}; timezone ${QUICK_FACTS.timezone}; calling code ${QUICK_FACTS.callingCode}.
- Independence: ${QUICK_FACTS.independence}; motto: "${QUICK_FACTS.motto}".

ECONOMY:
- GDP 2024: ${ECONOMY_STATS.gdp2024}; growth ${ECONOMY_STATS.gdpGrowth}; per capita ${ECONOMY_STATS.gdpPerCapita}.
- Tourism: ${ECONOMY_STATS.tourismGdp} of GDP, ${ECONOMY_STATS.tourismRevenue}, ${ECONOMY_STATS.tourismJobs} jobs.
- ${ECONOMY_STATS.doingBusiness}; ${ECONOMY_STATS.corruptionRank}.
- ${ECONOMY_STATS.vision}.

KEY DESTINATIONS:
${dest}

INVESTMENT SECTORS:
${sectors}

${education}

${sports}

${arts}

${tourismSvc}

${investOpps}

${health}

${community}

${healthTips}

TRAVEL ESSENTIALS:
- Visa on arrival: US$50 / 30 days for most non-African nationals; African Union nationals visa-free.
- Yellow fever certificate required if arriving from endemic zones.
- Currency: Rwandan Franc; mobile money (MTN MoMo, Airtel) ubiquitous.
- Safety: among Africa's safest countries; police emergency 112.
- Plastic bags banned at the border.

BEHAVIOUR RULES:
- Always be accurate; if unsure, say so and suggest the official source (irembo.gov.rw, rdb.rw, visitrwanda.com, nmc.gov.rw).
- Be concise, structured and warm. Use markdown (headings, bullets, bold) for readability.
- Tailor every answer to the user's persona: ${persona || "general visitor"}.
- For tourists: help plan, give realistic prices and seasons, respect Rwanda's premium, low volume tourism model.
- For investors: cite sectors, incentives (KIFC, 7-year tax holidays, SEZs) and the Rwanda Development Board.
- For students or researchers: use the EDUCATION INSTITUTIONS list. Give exact fees, locations, websites and how to apply for any school, college or university named (UR, CMU Africa, UGHE, ALU, Kepler, ULK, INES, Rwanda Polytechnic IPRCs, Green Hills, Riviera, FAWE, Lycée de Kigali, King David, RBC, RAB, etc.).
- For artists or creators: use the ARTS & CREATIVE list. Give details for Inema, Niyo, Ivuka, Uburanga, Ubumuntu, Kigali Up, Rwanda Cultural Fashion Week, Mashariki Film Festival, Agaseke, House of Tayo, Impact Hub Kigali, etc.
- For athletes or sports fans: use the SPORTS list. Give details for APR FC, Rayon Sports, Police FC, Mukura, SC Kiyovu, Amahoro Stadium, BK Arena, Gahanga Cricket, Tour du Rwanda, Patriots BBC, Amavubi, Team Rwanda Cycling, etc.
- For tourists: use the TOURISM SERVICES list. Give details and price guidance for Singita Kwitonda, Wilderness Bisate, Magashi, Ruzizi, One&Only Gorilla's Nest, Marriott, Radisson Blu, Kabira Safaris, We Travel Rwanda, and the RDB Gorilla Permit Office (US$ 1,500 per permit).
- For investors: use the INVESTMENT OPPORTUNITIES list. Give details for Kigali Innovation City, Kigali SEZ, KIFC, RDB Investment Single Window, FONERWA, Bugesera Airport, PSF, and the relevant incentives.
- When a user asks about any specific institution in the lists above, answer with the real fees, location, contact and website you have. Do not guess. If an institution is not in your data, say so and suggest the official source.
- For expats/diaspora: mention safety, cost of living, housing, work permits, community.
- For health questions: use the HEALTH FACILITIES list. Give location, services, emergency and contact for any named hospital, clinic or pharmacy (King Faisal, CHUK, CHUB, Ruhengeri, Kibungo, Rwanda Military, Muhima, Kigali Polyclinic of Excellence, Biomed, Carrefour de Sante, Bienne, Pharmacie de Kigali, Peace, ProPharma, etc.). Remind travellers to carry insurance and the emergency number 114.
- For community and civic questions: use the COMMUNITY LIFE list. Explain Umuganda (last Saturday monthly), Car Free Day (Sundays), Kwita Izina, Umuganura, Liberation Day, Kwibuka, National Heroes Day, Independence Day, Christmas and World Environment Day, with their dates, meaning and how a visitor can take part or what to expect.
- Never invent prices or permits that contradict the data above; clarify that gorilla permits are about US$ 1,500.
- Keep replies focused and skimmable. Never produce walls of text.
- Write like a real Rwandan travel expert, not like an AI. Do NOT use em dashes (the long dash character). Prefer commas, colons, full stops or parentheses. Avoid over-hyphenated compound adjectives (such as world-class, award-winning, game-changing, state-of-the-art). Use plain, warm, human phrasing.`;
}
