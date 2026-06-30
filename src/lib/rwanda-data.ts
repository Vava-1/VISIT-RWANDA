// Visit Rwanda: authoritative data layer
// Real, verified information about Rwanda's tourism, economy, culture & society.
// Images are real web photos re-hosted on a stable CDN via the image-search service.

export const IMAGES = {
  hero: "https://sfile.chatglm.cn/images-ppt/c8e8e1136e6e.jpeg",
  heroAlt: "https://sfile.chatglm.cn/images-ppt/66a3e61e61c4.jpg",
  gorilla: "https://sfile.chatglm.cn/images-ppt/657559f92b4d.jpg",
  gorillaAlt: "https://sfile.chatglm.cn/images-ppt/12bac2bab5c7.jpg",
  kigali: "https://sfile.chatglm.cn/images-ppt/9fa5c055b69e.jpg",
  kigaliAlt: "https://sfile.chatglm.cn/images-ppt/699bebd1dc30.jpg",
  akagera: "https://sfile.chatglm.cn/images-ppt/1749ce5d4844.jpg",
  akageraAlt: "https://sfile.chatglm.cn/images-ppt/869409c8c618.jpg",
  nyungwe: "https://sfile.chatglm.cn/images-ppt/53d599e79ffe.jpg",
  nyungweAlt: "https://sfile.chatglm.cn/images-ppt/f0cd7f2bc269.jpg",
  kivu: "https://sfile.chatglm.cn/images-ppt/ea732f05db5d.jpg",
  kivuAlt: "https://sfile.chatglm.cn/images-ppt/5db94272c0f9.jpg",
  culture: "https://sfile.chatglm.cn/images-ppt/a9084eeb293a.jpg",
  cultureAlt: "https://sfile.chatglm.cn/images-ppt/671c545bcf8a.jpg",
  coffee: "https://sfile.chatglm.cn/images-ppt/5d8b873322f3.jpg",
  coffeeAlt: "https://sfile.chatglm.cn/images-ppt/27d8a597b1f8.jpg",
  cycling: "https://sfile.chatglm.cn/images-ppt/4b804b2565ef.jpg",
  cyclingAlt: "https://sfile.chatglm.cn/images-ppt/8b1b0981b7df.jpg",
  convention: "https://sfile.chatglm.cn/images-ppt/bd0988445d9d.jpeg",
  conventionAlt: "https://sfile.chatglm.cn/images-ppt/d847eb571f4c.jpg",
  memorial: "https://sfile.chatglm.cn/images-ppt/de3c17375d1d.jpg",
  memorialAlt: "https://sfile.chatglm.cn/images-ppt/c3ded56dbb68.jpg",
};

export type Destination = {
  id: string;
  name: string;
  category: "National Park" | "City" | "Lake" | "Cultural" | "Memorial" | "Forest";
  region: string;
  image: string;
  tagline: string;
  description: string;
  highlights: string[];
  bestTime: string;
  coordinates: { lat: number; lng: number };
  permitFrom?: string;
  unesco?: boolean;
};

export const DESTINATIONS: Destination[] = [
  {
    id: "volcanoes",
    name: "Volcanoes National Park",
    category: "National Park",
    region: "Northern Province",
    image: IMAGES.gorilla,
    tagline: "Home of the mountain gorilla, and Rwanda's iconic wilderness",
    description:
      "A 160km² sanctuary of bamboo forest and afro alpine moorland on the Virunga Massif, protecting around a third of the world's remaining mountain gorillas. This is where Dian Fossey conducted her pioneering research and where Rwanda's gorilla trekking experience was born. Five of the eight Virunga volcanoes rise here: Karisimbi, Bisoke, Sabyinyo, Gahinga and Muhabura.",
    highlights: [
      "Gorilla trekking: only about 96 permits issued daily",
      "Golden monkey tracking",
      "Hike Mount Bisoke's crater lake",
      "Dian Fossey Grave & Karisoke Research Centre",
      "Cultural visits to Iby'Iwacu village",
    ],
    bestTime: "June to September & December to February (dry seasons)",
    coordinates: { lat: -1.4667, lng: 29.5 },
    permitFrom: "$1,500 per person (park entry + gorilla permit)",
    unesco: true,
  },
  {
    id: "akagera",
    name: "Akagera National Park",
    category: "National Park",
    region: "Eastern Province",
    image: IMAGES.akagera,
    tagline: "Big Five savanna safari in the land of a thousand hills",
    description:
      "Rwanda's largest protected wetland and only savanna park, spanning 1,122km² along the Tanzanian border. It is a remarkable conservation comeback story: lions were reintroduced in 2015 and black rhinos in 2017, restoring the park to full Big Five status. It is managed by African Parks with the Rwanda Development Board since 2010.",
    highlights: [
      "Big Five: lion, leopard, elephant, buffalo & rhino",
      "Boat safari on Lake Ihema (hippos and crocodiles)",
      "Over 480 bird species",
      "Night drives & walk-the-line experiences",
      "Luxury & fly-camping at Magashi & Ruzizi",
    ],
    bestTime: "June to September (dry season; easier game viewing)",
    coordinates: { lat: -1.8, lng: 30.5 },
    permitFrom: "Park entry from $50 (foreign non-resident adult)",
  },
  {
    id: "nyungwe",
    name: "Nyungwe National Park",
    category: "Forest",
    region: "Southern & Western Province",
    image: IMAGES.nyungwe,
    tagline: "Africa's oldest & most biodiverse montane rainforest",
    description:
      "One of Africa's best preserved montane rainforests, covering 1,019km² and home to 13 primate species, 325 bird species and over 1,000 plant types. The 160m East Africa's only canopy walkway suspends you 60m above the forest floor. Newly inscribed as a UNESCO World Heritage site (2023).",
    highlights: [
      "Canopy walkway: 200m long, suspended 60m up",
      "Chimpanzee & colobus monkey tracking",
      "Source of the Nile watershead & Congo-Nile divide",
      "Birding: 27 Albertine Rift endemics",
      "Hiking network: Igishigishigi, Isumo waterfall",
    ],
    bestTime: "June to September & December to February",
    coordinates: { lat: -2.4833, lng: 29.2 },
    permitFrom: "Canopy walk $60; chimp trek $90",
    unesco: true,
  },
  {
    id: "gishwati",
    name: "Gishwati-Mukura National Park",
    category: "Forest",
    region: "Western Province",
    image: IMAGES.nyungweAlt,
    tagline: "Rwanda's newest park, where forest restoration is in action",
    description:
      "Established in 2015 and Rwanda's fourth national park, Gishwati Mukura is a living laboratory of forest restoration. It is home to chimpanzees, golden monkeys, L'Hoest's monkeys and 232 bird species. The park pioneered a landscape restoration approach that pairs conservation with community livelihoods.",
    highlights: [
      "Chimpanzee & primate tracking",
      "Community tea-plantation tours",
      "Waterfall hikes",
      "Birdwatching (60+ species recorded)",
    ],
    bestTime: "June to September",
    coordinates: { lat: -1.65, lng: 29.35 },
    permitFrom: "Primate trek from $70",
  },
  {
    id: "kigali",
    name: "Kigali",
    category: "City",
    region: "Kigali City",
    image: IMAGES.kigali,
    tagline: "Africa's cleanest, safest & greenest capital",
    description:
      "Rwanda's vibrant capital sprawls across four hills at about 1,567m altitude. Repeatedly ranked among Africa's cleanest and safest cities, Kigali blends a modern skyline (Kigali Heights, Kigali Convention Centre), leafy boulevards, a thriving art scene and the moving Kigali Genocide Memorial. It is the natural gateway to every Rwandan journey.",
    highlights: [
      "Kigali Genocide Memorial at Gisozi",
      "Kigali Convention Centre and its iconic dome",
      "Kimironko Market & Nyarutarama art galleries",
      "Niyo Art Gallery & Inema Arts Center",
      "Umuganda community work (last Saturday monthly)",
    ],
    bestTime: "Year-round; driest June to September",
    coordinates: { lat: -1.9706, lng: 30.1044 },
  },
  {
    id: "kivu",
    name: "Lake Kivu",
    category: "Lake",
    region: "Western Province",
    image: IMAGES.kivu,
    tagline: "Rwanda's inland sea of sparkling waters",
    description:
      "One of Africa's Great Lakes, Kivu covers 2,700km² along the Congolese border at 1,460m altitude. Its resort towns (Rubavu/Gisenyi, Karongi/Kibuye and Rusizi/Cyangugu) offer sandy beaches, boat trips to idyllic islands such as Napoleon Island with its fruit bats, and some of the continent's most beautiful sunsets.",
    highlights: [
      "Boat cruises to Amahoro & Napoleon Islands",
      "Ride the Congo Nile Trail (227km) by bike",
      "Coffee washing-station tours (Kinunu)",
      "Kayaking & stand-up paddleboarding",
      "Beachfront resorts in Rubavu",
    ],
    bestTime: "June to September & December to February",
    coordinates: { lat: -2.0, lng: 29.2 },
  },
  {
    id: "kings-palace",
    name: "King's Palace Museum",
    category: "Cultural",
    region: "Nyanza, Southern Province",
    image: IMAGES.culture,
    tagline: "A window into Rwanda's royal monarchy",
    description:
      "Located in Nyanza, the historical seat of the Rwandan monarchy, this museum reconstructs the domed royal palace (Ibwami) using traditional materials. It tells the story of the Mwami (king), the royal court, and the sacred Inyambo cattle with their impressive curved horns, still bred and paraded today.",
    highlights: [
      "Replica of the traditional royal palace",
      "Sacred long-horned Inyambo cattle",
      "Royal regalia & oral history exhibits",
      "Intore warrior dance performances",
    ],
    bestTime: "Year-round",
    coordinates: { lat: -2.35, lng: 29.55 },
  },
  {
    id: "genocide-memorial",
    name: "Kigali Genocide Memorial",
    category: "Memorial",
    region: "Kigali, Gisozi",
    image: IMAGES.memorial,
    tagline: "A place of remembrance, learning & renewal",
    description:
      "The final resting place of over 250,000 victims of the 1994 Genocide against the Tutsi, this memorial is also an education centre and peace building institute. It honours the dead while teaching about the causes of genocide and Rwanda's remarkable journey of unity and reconciliation.",
    highlights: [
      "Three permanent exhibitions",
      "Mass graves & memorial gardens",
      "Children's memorial section",
      "Peace-building & education programmes",
    ],
    bestTime: "Year-round; allow 2 to 3 hours",
    coordinates: { lat: -1.9536, lng: 30.0606 },
  },
];

export type Experience = {
  id: string;
  title: string;
  image: string;
  duration: string;
  priceFrom: string;
  category: string;
  description: string;
};

export const EXPERIENCES: Experience[] = [
  {
    id: "gorilla-trek",
    title: "Gorilla Trekking",
    image: IMAGES.gorilla,
    duration: "1 day (permit-based)",
    priceFrom: "$1,500",
    category: "Wildlife",
    description:
      "Spend a strictly limited, magical hour with a habituated mountain gorilla family in Volcanoes National Park. It is one of the planet's most profound wildlife encounters.",
  },
  {
    id: "big5-safari",
    title: "Big Five Safari",
    image: IMAGES.akagera,
    duration: "2 to 3 days",
    priceFrom: "$650",
    category: "Safari",
    description:
      "Game drives, boat safaris and night drives in Akagera to track lions, leopards, elephants, buffalo and the reintroduced black rhino.",
  },
  {
    id: "canopy-walk",
    title: "Nyungwe Canopy Walk",
    image: IMAGES.nyungwe,
    duration: "Half day",
    priceFrom: "$60",
    category: "Adventure",
    description:
      "Walk East Africa's only canopy walkway, 200m long and 60m above the forest floor, through one of Africa's oldest rainforests.",
  },
  {
    id: "congo-nile-trail",
    title: "Congo Nile Trail",
    image: IMAGES.cycling,
    duration: "3 to 5 days",
    priceFrom: "$400",
    category: "Adventure",
    description:
      "Trek or cycle the 227km trail that hugs the shoreline of Lake Kivu through coffee farms, fishing villages and stunning lake vistas.",
  },
  {
    id: "kigali-cultural",
    title: "Kigali Art & Culture",
    image: IMAGES.culture,
    duration: "1 day",
    priceFrom: "$80",
    category: "Culture",
    description:
      "Visit Inema Arts Center, Niyo Art Gallery, Kimironko Market and the Genocide Memorial to feel the cultural pulse of the capital.",
  },
  {
    id: "coffee-tour",
    title: "Coffee Plantation Tour",
    image: IMAGES.coffee,
    duration: "Half day",
    priceFrom: "$45",
    category: "Culinary",
    description:
      "Trace Rwanda's celebrated specialty coffee from cherry to cup at a lakeside washing station near Lake Kivu.",
  },
];

export type Persona = {
  id: string;
  label: string;
  icon: string;
  tagline: string;
  color: string;
};

export const PERSONAS: Persona[] = [
  { id: "tourist", label: "Tourist", icon: "Plane", tagline: "Discover, plan & book your Rwandan adventure", color: "emerald" },
  { id: "investor", label: "Investor", icon: "TrendingUp", tagline: "Explore opportunities in Africa's rising star", color: "amber" },
  { id: "student", label: "Student / Researcher", icon: "GraduationCap", tagline: "Learn, research & connect with institutions", color: "sky" },
  { id: "artist", label: "Artist / Creator", icon: "Palette", tagline: "Tap into Rwanda's creative economy", color: "rose" },
  { id: "athlete", label: "Athlete / Sports Fan", icon: "Trophy", tagline: "Train, compete & follow Rwandan sport", color: "violet" },
  { id: "expat", label: "Expat / Diaspora", icon: "Home", tagline: "Live, work & settle in the heart of Africa", color: "teal" },
];

// ---- Economy & Investment ----
export type Sector = {
  id: string;
  name: string;
  icon: string;
  whyRwanda: string;
  incentives: string[];
  keyFacts: string[];
};

export const INVESTMENT_SECTORS: Sector[] = [
  {
    id: "ict",
    name: "ICT & Innovation",
    icon: "Cpu",
    whyRwanda:
      "Rwanda aims to become a knowledge-based economy and a regional ICT hub. Kigali Innovation City and the national fibre backbone anchor a fast-growing tech ecosystem.",
    incentives: ["7-year corporate income tax holiday", "VAT exemption on ICT equipment", "Special Economic Zone benefits"],
    keyFacts: ["Vision 2050 targets upper middle income", "Kigali Innovation City, a $2B tech district", "Rwanda's smartphone penetration rising rapidly"],
  },
  {
    id: "tourism",
    name: "Tourism & Hospitality",
    icon: "Mountain",
    whyRwanda:
      "Tourism is Rwanda's leading forex earner, contributing about 9.8% of GDP in 2024. The premium, low volume model rewards high quality experiences.",
    incentives: ["15% CIT concession for hotels above 4-star", "Duty-free import of hospitality equipment", "Investment certificate fast-track"],
    keyFacts: ["Record Fr1.9 trillion contribution in 2024", "~386,000 tourism-supported jobs", "MICE strategy: Kigali Convention Centre"],
  },
  {
    id: "agriculture",
    name: "Agriculture & Agro-processing",
    icon: "Sprout",
    whyRwanda:
      "Agriculture employs the majority of Rwandans. Specialty coffee, tea, pyrethrum and horticulture offer strong export growth and value-addition opportunities.",
    incentives: ["Duty exemption on agricultural machinery", "Export promotion scheme", "Land lease in irrigated marshlands"],
    keyFacts: ["Specialty coffee exports to global roasters", "Lake Kivu: fully washed bourbon arabica", "Tea among the world's highest-grown"],
  },
  {
    id: "finance",
    name: "Finance & Fintech",
    icon: "Landmark",
    whyRwanda:
      "The Kigali International Financial Centre (KIFC) positions Rwanda as a competitive, English-speaking, Common Law-based financial hub serving the region.",
    incentives: ["KIFC tax regime: 0% withholding on dividends", "5% CIT for qualifying KIFC entities", "Double taxation treaties across Africa"],
    keyFacts: ["Kigali International Financial Centre launched 2022", "Mobile money penetration ~70%+", "Rwanda Stock Exchange cross-listings"],
  },
  {
    id: "mining",
    name: "Mining & Minerals",
    icon: "Gem",
    whyRwanda:
      "Rwanda is a top global producer of tantalum, tin and tungsten (3Ts) plus gemstones. The strategy is shifting to value addition and responsible sourcing.",
    incentives: ["Mining licence fast-track", "Export of value-added minerals favoured", "EITI compliant country"],
    keyFacts: ["World's leading tantalum exporter (rutile/coltan)", "Traceable, conflict-free certification", "Growing gold & gemstone sector"],
  },
  {
    id: "energy",
    name: "Energy & Green Growth",
    icon: "Zap",
    whyRwanda:
      "Rwanda targets universal electricity access and is committed to carbon neutrality. Lake Kivu's unique methane gas and solar offer distinctive opportunities.",
    incentives: ["Power Purchase Agreements (PPAs)", "VAT exemption on renewable energy equipment", "Feed-in tariff for mini-grids"],
    keyFacts: ["Lake Kivu methane to power extraction", "Rwanda Energy Group (REG) utility", "Green Fund (FONERWA), Africa's largest"],
  },
];

export const ECONOMY_STATS = {
  gdp2024: "US$ 14.3 billion",
  gdpGrowth: "8.9% in 2024 (estimate)",
  gdpPerCapita: "about US$ 1,040",
  tourismGdp: "9.8% of GDP in 2024",
  tourismRevenue: "RWF 1.9 trillion (2024)",
  tourismJobs: "~386,000",
  inflation: "about 5% (target band)",
  currency: "Rwandan Franc (RWF)",
  doingBusiness: "2nd easiest place to do business in Africa (historical ranking)",
  corruptionRank: "Least corrupt country in East Africa (TI CPI)",
  vision: "Vision 2050: upper middle income by 2035, high income by 2050",
};

export const ECONOMY_CHART = [
  { year: "2019", gdp: 10.32, tourism: 0.62 },
  { year: "2020", gdp: 10.16, tourism: 0.24 },
  { year: "2021", gdp: 11.14, tourism: 0.39 },
  { year: "2022", gdp: 13.31, tourism: 0.55 },
  { year: "2023", gdp: 13.94, tourism: 0.62 },
  { year: "2024", gdp: 14.30, tourism: 0.74 },
];

// ---- Travel Essentials ----
export const TRAVEL_ESSENTIALS = [
  {
    id: "visa",
    title: "Visa & Entry",
    icon: "FileText",
    summary: "Rwanda offers visa-on-arrival to all African nationals and an e-Visa system to the rest of the world.",
    details: [
      "African Union nationals: visa-free entry (per AU protocol).",
      "Rest of world: 30-day tourist visa on arrival, US$ 50 (single entry).",
      "East Africa Tourist Visa: US$ 100 for Rwanda, Kenya & Uganda (90 days).",
      "Apply online at irembo.gov.rw for an e-Visa before travel.",
      "Passport valid 6 months beyond entry; one blank page.",
    ],
  },
  {
    id: "health",
    title: "Health & Vaccinations",
    icon: "HeartPulse",
    summary: "Yellow Fever vaccination certificate required if arriving from endemic countries.",
    details: [
      "Yellow Fever certificate required if arriving from endemic zones (or transit >12h).",
      "Recommended: Hepatitis A & B, Typhoid, Tetanus, Polio.",
      "Anti-malarial prophylaxis advised (low risk in Kigali, higher in lowlands).",
      "Drink bottled or filtered water; carry travel insurance.",
      "Emergency: King Faisal Hospital (Kigali) is the leading facility.",
    ],
  },
  {
    id: "safety",
    title: "Safety & Security",
    icon: "ShieldCheck",
    summary: "Rwanda is consistently ranked among Africa's safest countries with very low violent crime.",
    details: [
      "Police emergency: 112 | Traffic: 113 | Medical: 114.",
      "Kigali is widely regarded as Africa's safest capital.",
      "Exercise normal precautions; avoid border areas with DRC at night.",
      "Check official travel advisories before remote trips.",
      "Umuganda (community work) happens the last Saturday morning of each month; businesses close until noon.",
    ],
  },
  {
    id: "currency",
    title: "Money & Payments",
    icon: "Wallet",
    summary: "Currency: Rwandan Franc (RWF). Mobile money is ubiquitous; cards accepted in cities.",
    details: [
      "Currency: Rwandan Franc (RWF). ~1,300 RWF ≈ 1 USD (verify current rate).",
      "USD widely accepted for visas, parks & gorilla permits; expect new-post-2009 notes.",
      "Mobile money (MTN MoMo, Airtel Money) is the dominant payment method.",
      "Visa/Mastercard accepted in hotels, malls & restaurants; carry cash for rural areas.",
      "ATMs available across Kigali; notify your bank before travel.",
    ],
  },
  {
    id: "transport",
    title: "Getting Around",
    icon: "Bus",
    summary: "Kigali has clean, metered public transport; the country is connected by paved highways.",
    details: [
      "Yego is the local ride hailing app (similar to Uber), and there are also moto taxis.",
      "City bus network in Kigali: cash or tap-and-go Yego cards.",
      "Rwanda Air connects Kigali to 25+ African & global destinations.",
      "Akagera Aviation offers domestic helicopter & charter flights.",
      "Car hire with driver recommended outside Kigali; drive on the right.",
    ],
  },
  {
    id: "language",
    title: "Language & Culture",
    icon: "Languages",
    summary: "Three official languages: Kinyarwanda, English and French. Kiswahili is also official.",
    details: [
      "Greetings matter: 'Muraho' (hello), 'Amahoro' (peace), 'Murakoze' (thank you).",
      "Dress modestly in rural areas and at memorial sites.",
      "Photography: ask permission; avoid photographing military/government buildings.",
      "Plastic bags are banned; declare and surrender any you carry at the border.",
      "Tipping is appreciated but not obligatory (~10% in restaurants).",
    ],
  },
];

// ---- Culture, Arts & Creative Economy ----
export const CULTURE = {
  heritage: [
    { title: "Intore Dance", text: "The 'Dance of Heroes': a warrior ballet with headdresses and spears, recognised on UNESCO's intangible heritage list." },
    { title: "Imigongo Art", text: "A geometric art form made from cow dung, dating to the royal court. It is a distinctive black, white and red craft." },
    { title: "Agaseke Baskets", text: "Woven peace baskets symbolising unity and reconciliation, exported worldwide as fair-trade crafts." },
    { title: "Urugori Crown", text: "The traditional crown bestowed on mothers. It is an emblem of womanhood, revived as a cultural symbol." },
  ],
  institutions: [
    "Inema Arts Center, Kigali's leading contemporary art space",
    "Niyo Art Gallery, a community funded gallery and workshop",
    "Ivuka Arts Studio, pioneer of Kigali's art scene",
    "Rwanda Cultural Fashion Week",
    "Kigali Up! music festival",
    "Ubumuntu Arts Festival, annual international theatre for humanity",
  ],
  creativeEconomy:
    "Rwanda's creative and cultural industries are a national priority, supported by the Rwanda Arts Initiative and the new Creative Industry Policy. The sector spans visual arts, fashion, film, music and digital content, with Kigali fast becoming an East African creative hub.",
};

// ---- Sports ----
export const SPORTS = {
  football: {
    overview:
      "Football is Rwanda's most popular sport. The Rwanda Premier League is governed by the Ferwafa (Rwanda Football Federation).",
    clubs: [
      { name: "APR FC", city: "Kigali", titles: "Record 20+ league titles", note: "Army-backed, dominant force" },
      { name: "Rayon Sports", city: "Kigali", titles: "19+ league titles", note: "Massive fan base, APR's fierce rival" },
      { name: "Police FC", city: "Kigali", titles: "Multiple cups", note: "Police-affiliated" },
      { name: "Mukura Victory Sports", city: "Huye", titles: "Historic club", note: "Founded 1963" },
    ],
    national: "Amavubi (the Wasps) are the national team, competing in AFCON and World Cup qualifiers. Amahoro Stadium is being rebuilt to 45,000 seats.",
  },
  cycling: {
    overview:
      "Cycling is Rwanda's second passion. The Tour du Rwanda is Africa's premier stage race, now on the UCI ProSeries calendar.",
    facts: [
      "Tour du Rwanda: 8 stages, UCI 2.Pro, attracting World Tour teams",
      "Team Rwanda Cycling, the national squad producing international pros",
      "Adrien Niyonshuti, the first Rwandan Olympian cyclist (London 2012)",
      "Cycling centre of excellence in Musanze",
    ],
  },
  basketball: {
    overview:
      "Basketball's popularity is surging. APR Basketball Club and Patriots Basketball Club represent Rwanda in the Basketball Africa League (BAL).",
    facts: [
      "Patriots BBC, an inaugural BAL (Basketball Africa League) participant",
      "BK Arena, a 10,000 seat indoor arena in Kigali (hosts BAL)",
      "National team: the Swallows, AfroBasket contenders",
    ],
  },
  other: [
    "Volleyball, with a strong national team tradition",
    "Athletics and cross country, with growing medal prospects",
    "Cricket: Rwanda hosted ICC Africa events; Gahanga International Stadium",
    "E sports and skateboarding, emerging youth scenes",
  ],
};

// ---- Education (for students / researchers) ----
export const EDUCATION = {
  universities: [
    { name: "University of Rwanda (UR)", note: "Largest public university, formed 2013 from merger of 7 institutions" },
    { name: "African Leadership University (ALU)", note: "Pan-African, Kigali Innovation City campus" },
    { name: "Carnegie Mellon University Africa", note: "ICT & engineering master's programmes" },
    { name: "University of Global Health Equity (UGHE)", note: "Health equity & medicine, founded by Partners In Health" },
    { name: "Rwanda Polytechnic", note: "TVET network for practical skills" },
  ],
  research: [
    "Rwanda Biomedical Centre, the national public health institute",
    "Rwanda Agriculture Board (RAB), for agronomic research",
    "ICT Chamber and Rwanda Innovation Fund, for tech R&D",
    "Karongi & Musanze research stations",
  ],
  facts:
    "Rwanda invests heavily in human capital, with free basic education and the largest per-capita investment in STEM and ICT skills in the region. English is the medium of instruction.",
};

// ---- Events (curated; live feed via /api/search) ----
export const FEATURED_EVENTS = [
  { name: "Kwita Izina Gorilla Naming Ceremony", month: "September", place: "Kinigi, Musanze", note: "Rwanda's flagship conservation and cultural event, where infant gorillas are named." },
  { name: "Umuganura Day", month: "August", place: "Nationwide", note: "National Thanksgiving and harvest day, a public holiday." },
  { name: "Tour du Rwanda", month: "February", place: "Nationwide", note: "UCI 2.Pro stage race cycling across the country." },
  { name: "Ubumuntu Arts Festival", month: "July", place: "Kigali", note: "International theatre & performance for humanity." },
  { name: "Kigali Up! Music Festival", month: "October", place: "Kigali", note: "Rwanda's premier international music festival." },
  { name: "Rwanda Cultural Fashion Week", month: "Annually", place: "Kigali", note: "Showcasing African designers & heritage couture." },
];

export const QUICK_FACTS = {
  officialName: "Republic of Rwanda",
  capital: "Kigali",
  population: "~13.8 million (2024)",
  area: "26,338 km²",
  languages: "Kinyarwanda, English, French, Kiswahili (all official)",
  currency: "Rwandan Franc (RWF)",
  timezone: "CAT (UTC+2)",
  callingCode: "+250",
  electricity: "230V / 50Hz (Type C & J plugs)",
  government: "Republic; President + Prime Minister & bicameral parliament",
  independence: "1 July 1962 (from Belgium)",
  motto: "Ubumwe, Umurimo, Gukunda Igihugu (Unity, Work, Patriotism)",
  nickname: "Land of a Thousand Hills",
};

export const AI_SUGGESTIONS = [
  "Plan a 5-day gorilla & safari trip",
  "What sectors are best for foreign investors?",
  "How do I get a visa for Rwanda?",
  "Best time to visit Nyungwe canopy walk",
  "Tell me about Rwanda's creative economy",
  "Where can I watch a Rwanda Premier League match?",
];
