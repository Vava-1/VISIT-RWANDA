// Transparent sourcing for every dataset on the platform.
// Every figure shown to users has a source, URL, and last-updated date.

export type DataSource = {
  label: string;
  source: string;
  sourceUrl: string;
  lastUpdated: string;
  note: string;
  live: boolean; // true if fetched from a live API, false if curated
};

export const DATA_SOURCES: Record<string, DataSource> = {
  economy: {
    label: "Economic statistics",
    source: "National Institute of Statistics of Rwanda (NISR) + Ministry of Finance",
    sourceUrl: "https://www.statistics.gov.rw",
    lastUpdated: "2024 annual figures (published 2025)",
    note: "GDP, growth and tourism figures from NISR statistical reports. Curated pending a data-sharing agreement with NISR for live feeds.",
    live: false,
  },
  destinations: {
    label: "Destinations and parks",
    source: "Rwanda Development Board (RDB) + African Parks",
    sourceUrl: "https://rdb.rw",
    lastUpdated: "Curated 2025",
    note: "Park information from RDB and park operators. Permit prices set by RDB and subject to change. Always confirm at rdb.rw before booking.",
    live: false,
  },
  institutions: {
    label: "Institutions (education, sports, arts, health, transport)",
    source: "Official institution websites and Rwanda government directories",
    sourceUrl: "https://www.gov.rw",
    lastUpdated: "Curated 2025",
    note: "Fees and contacts verified from each institution's official website. Fees change. Confirm directly before applying or visiting.",
    live: false,
  },
  transport: {
    label: "Transport",
    source: "Bus company offices, Yego, KT Press",
    sourceUrl: "https://yego.rw",
    lastUpdated: "Curated 2025",
    note: "Prices are typical ranges. Bus fares fluctuate with fuel prices. Confirm at the bus park or via the operator.",
    live: false,
  },
  hotels: {
    label: "Hotels and lodges",
    source: "Property websites and booking platforms",
    sourceUrl: "https://www.visitrwanda.com",
    lastUpdated: "Curated 2025",
    note: "Price ranges are seasonal and indicative. Real-time availability requires a direct API integration with each property or a central booking system, not yet in place.",
    live: false,
  },
  news: {
    label: "Live news",
    source: "Google News RSS and KT Press",
    sourceUrl: "https://ktpress.rw",
    lastUpdated: "Live, refreshed on each visit",
    note: "Aggregated from public RSS feeds. For an official press desk, a partnership with RDB communications is needed.",
    live: true,
  },
  community: {
    label: "Community life and national days",
    source: "Government of Rwanda and MINICOM",
    sourceUrl: "https://www.gov.rw",
    lastUpdated: "Curated 2025",
    note: "National holiday dates are fixed by law. Community practices like Umuganda are governed by government policy.",
    live: false,
  },
  visa: {
    label: "Visa and entry",
    source: "Directorate General of Immigration and Emigration",
    sourceUrl: "https://irembo.gov.rw",
    lastUpdated: "Curated 2025",
    note: "Visa policy set by the Directorate of Immigration. Apply via Irembo at irembo.gov.rw. Confirm current fees before travel.",
    live: false,
  },
  currency: {
    label: "Exchange rates",
    source: "Open Exchange Rates (free API)",
    sourceUrl: "https://open.er-api.com",
    lastUpdated: "Live, refreshed hourly",
    note: "Rates fetched from a free public exchange rate API.",
    live: true,
  },
};

export const PLATFORM_LAST_UPDATED = "2025";

// Visa application deep link to the official Irembo portal
export const VISA_APPLICATION_URL = "https://irembo.gov.rw/portal/services/iremboGov/residentpermitcitizenorforeigner/newapplication";
export const IREMBO_URL = "https://irembo.gov.rw";
