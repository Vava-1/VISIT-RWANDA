"use client";

import * as React from "react";

// Supported languages. Kinyarwanda (rw) and French (fr) translations cover the
// most visible UI strings (nav, hero, section headers, buttons). Content data
// (institutions, descriptions) remains in English for now; full content
// translation requires a professional localization effort.

export type Lang = "en" | "rw" | "fr";

export const LANGS: { id: Lang; label: string; native: string }[] = [
  { id: "en", label: "English", native: "English" },
  { id: "rw", label: "Kinyarwanda", native: "Kinyarwanda" },
  { id: "fr", label: "French", native: "Français" },
];

type Dict = Record<string, string>;

const en: Dict = {
  "nav.discover": "Discover",
  "nav.experiences": "Experiences",
  "nav.cities": "Cities",
  "nav.invest": "Invest",
  "nav.travel": "Travel",
  "nav.health": "Health",
  "nav.live": "Live",
  "nav.connect": "Connect",
  "nav.plan": "Plan",
  "nav.askRwanda": "Ask RWANDA",
  "hero.title": "Visit Rwanda",
  "hero.subtitle": "Land of a Thousand Hills",
  "hero.tagline": "The Heart of Africa, Open for the World",
  "hero.body": "Your intelligent gateway to Rwanda, for tourists, investors, students, artists, athletes and diaspora. Discover destinations, plan trips, explore opportunities and connect with a nation on the rise.",
  "hero.searchPlaceholder": "Ask anything about Rwanda: visas, gorillas, investing…",
  "hero.personalise": "Personalise your experience",
  "cta.backHome": "Back to home",
  "footer.safeData": "Safe with your data",
  "footer.personalised": "Personalised for you",
  "footer.alwaysCurrent": "Always current",
  "footer.reportIssue": "Report an issue",
  "booking.title": "Book your stay",
  "booking.checkIn": "Check-in",
  "booking.checkOut": "Check-out",
  "booking.guests": "Guests",
  "booking.rooms": "Rooms",
  "booking.fullName": "Full name",
  "booking.email": "Email",
  "booking.phone": "Phone",
  "booking.specialRequests": "Special requests (optional)",
  "booking.submit": "Request booking",
  "booking.bookNow": "Book Now",
  "sos.title": "Emergency",
  "sos.police": "Police: 112",
  "sos.ambulance": "Ambulance: 114",
  "sos.nearestHospital": "Nearest hospital",
  "lang.switch": "Language",
};

const rw: Dict = {
  "nav.discover": "Kumenya",
  "nav.experiences": "Ibyiza gukora",
  "nav.cities": "Imidugudu",
  "nav.invest": "Gushora",
  "nav.travel": "Urugendo",
  "nav.health": "Ubuzima",
  "nav.live": "Umuco",
  "nav.connect": "Vugisha",
  "nav.plan": "Gahunda",
  "nav.askRwanda": "Baza RWANDA",
  "hero.title": "Mukerereweza Rwanda",
  "hero.subtitle": "Igihugu cy'Imisozi Igihumbi",
  "hero.tagline": "Umutima w'Afurika, Ufunguriwe Isi",
  "hero.body": "Umuyoboro wanyu w'ikoranabuhanga ugana u Rwanda, abakenera bagenzi, abashoramari, abanyeshuri, abahanzi, abakinnyi n'abanyarwanda b mu mahanga. Menya ahantu, tegura urugendo, shakishira amahirwe, unahunze igihugu kizamuka.",
  "hero.searchPlaceholder": "Baza ibyo ushaka ku Rwanda: vizas, ingagi, gushora…",
  "hero.personalise": "Hita umubare w'ubunararibonye bwawe",
  "cta.backHome": "Subira ku rugo",
  "footer.safeData": "Amakuru yawe arinzwe",
  "footer.personalised": "Yabagenewe",
  "footer.alwaysCurrent": "Biheruka kugezaho",
  "footer.reportIssue": "Menyesha ikibazo",
  "booking.title": "Tegura guturwa",
  "booking.checkIn": "Kwinjira",
  "booking.checkOut": "Kuva",
  "booking.guests": "Abashyitsi",
  "booking.rooms": "Ibyumba",
  "booking.fullName": "Amazina yuzuye",
  "booking.email": "Imeyili",
  "booking.phone": "Telefoni",
  "booking.specialRequests": "Ibyo usaba (byihariye)",
  "booking.submit": "Saba guturwa",
  "booking.bookNow": "Tegura Nonaha",
  "sos.title": "Ibyihutirwa",
  "sos.police": "Polisi: 112",
  "sos.ambulance": "Ambulansi: 114",
  "sos.nearestHospital": "Ibitaro bikerewe",
  "lang.switch": "Ururimi",
};

const fr: Dict = {
  "nav.discover": "Découvrir",
  "nav.experiences": "Expériences",
  "nav.cities": "Villes",
  "nav.invest": "Investir",
  "nav.travel": "Voyager",
  "nav.health": "Santé",
  "nav.live": "Vivre",
  "nav.connect": "Connecter",
  "nav.plan": "Planifier",
  "nav.askRwanda": "Demander à RWANDA",
  "hero.title": "Visitez le Rwanda",
  "hero.subtitle": "Le Pays aux Mille Collines",
  "hero.tagline": "Le cœur de l'Afrique, ouvert au monde",
  "hero.body": "Votre passerelle intelligente vers le Rwanda, pour les touristes, investisseurs, étudiants, artistes, sportifs et diaspora. Découvrez les destinations, planifiez des voyages, explorez les opportunités et connectez-vous avec une nation en plein essor.",
  "hero.searchPlaceholder": "Demandez tout sur le Rwanda: visas, gorilles, investir…",
  "hero.personalise": "Personnalisez votre expérience",
  "cta.backHome": "Retour à l'accueil",
  "footer.safeData": "Vos données en sécurité",
  "footer.personalised": "Personnalisé pour vous",
  "footer.alwaysCurrent": "Toujours à jour",
  "footer.reportIssue": "Signaler un problème",
  "booking.title": "Réservez votre séjour",
  "booking.checkIn": "Arrivée",
  "booking.checkOut": "Départ",
  "booking.guests": "Invités",
  "booking.rooms": "Chambres",
  "booking.fullName": "Nom complet",
  "booking.email": "Email",
  "booking.phone": "Téléphone",
  "booking.specialRequests": "Demandes spéciales (optionnel)",
  "booking.submit": "Demander une réservation",
  "booking.bookNow": "Réserver",
  "sos.title": "Urgence",
  "sos.police": "Police: 112",
  "sos.ambulance": "Ambulance: 114",
  "sos.nearestHospital": "Hôpital le plus proche",
  "lang.switch": "Langue",
};

const DICTS: Record<Lang, Dict> = { en, rw, fr };

const LangContext = React.createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("en");

  React.useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("vr-lang") : null;
    if (saved === "en" || saved === "rw" || saved === "fr") {
      setLangState(saved);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("vr-lang", l);
  };

  const t = (key: string) => DICTS[lang][key] || DICTS.en[key] || key;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return React.useContext(LangContext);
}
