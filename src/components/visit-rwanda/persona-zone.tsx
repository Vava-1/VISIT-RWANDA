"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane, TrendingUp, GraduationCap, Palette, Trophy, Home as HomeIcon,
  Sparkles, ArrowRight, type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/lib/store";
import { PERSONAS } from "@/lib/rwanda-data";

const ICONS: Record<string, LucideIcon> = {
  Plane, TrendingUp, GraduationCap, Palette, Trophy, HomeIcon,
};

type PersonaContent = {
  greeting: string;
  body: string;
  quickLinks: { label: string; page: string }[];
  ask: string;
  accent: string;
};

const CONTENT: Record<string, PersonaContent> = {
  tourist: {
    greeting: "Ready for the adventure of a lifetime?",
    body: "Track mountain gorillas in Volcanoes National Park, safari the Big Five in Akagera, walk Nyungwe's canopy and unwind on Lake Kivu. Let's plan your perfect Rwandan journey.",
    quickLinks: [
      { label: "Explore destinations", page: "discover" },
      { label: "Signature experiences", page: "experiences" },
      { label: "Visa & travel", page: "travel" },
    ],
    ask: "Plan me a 7-day Rwanda trip mixing gorilla trekking, a safari and Lake Kivu.",
    accent: "from-emerald-500 to-teal-600",
  },
  investor: {
    greeting: "Welcome to Africa's rising investment star",
    body: "Rwanda offers political stability, zero tolerance for corruption, the Kigali International Financial Centre and a 7-year corporate tax holiday in priority sectors. Let's find your opportunity.",
    quickLinks: [
      { label: "Investment sectors", page: "invest" },
      { label: "Economic data", page: "invest" },
      { label: "Business news", page: "connect" },
    ],
    ask: "What are the best investment opportunities in Rwanda for a foreign investor, and how do I register a company via RDB?",
    accent: "from-amber-500 to-orange-600",
  },
  student: {
    greeting: "Learn in the heart of Africa",
    body: "Study at the University of Rwanda, Carnegie Mellon University Africa, ALU or UGHE. Research at the Rwanda Biomedical Centre. Rwanda invests heavily in STEM, ICT and human capital.",
    quickLinks: [
      { label: "Universities & research", page: "live" },
      { label: "Country facts", page: "travel" },
      { label: "Latest news", page: "connect" },
    ],
    ask: "What scholarships and universities are available for international students in Rwanda?",
    accent: "from-sky-500 to-blue-600",
  },
  artist: {
    greeting: "Join Rwanda's creative renaissance",
    body: "From Inema Arts Center and Niyo Gallery to the Ubumuntu Arts Festival and Rwanda Cultural Fashion Week. Kigali is fast becoming an East African creative hub with real support.",
    quickLinks: [
      { label: "Culture & heritage", page: "live" },
      { label: "Events", page: "connect" },
      { label: "Creative economy", page: "live" },
    ],
    ask: "How can an artist or creative professional get involved in Rwanda's creative economy?",
    accent: "from-rose-500 to-pink-600",
  },
  athlete: {
    greeting: "Train, compete & celebrate sport",
    body: "Watch APR vs Rayon Sports, ride the Tour du Rwanda (UCI 2.Pro), or catch the Basketball Africa League at BK Arena. Rwanda's sporting ambition is on the rise.",
    quickLinks: [
      { label: "Football & cycling", page: "live" },
      { label: "Events calendar", page: "connect" },
      { label: "Sports news", page: "connect" },
    ],
    ask: "Tell me about Rwanda's top football clubs, the Tour du Rwanda and how to attend a match.",
    accent: "from-violet-500 to-purple-600",
  },
  expat: {
    greeting: "Make Rwanda home",
    body: "Live in one of Africa's safest, cleanest cities. Enjoy a growing expat community, affordable living, reliable connectivity and a welcoming culture. Here's how to settle in.",
    quickLinks: [
      { label: "Safety & essentials", page: "travel" },
      { label: "Culture & language", page: "live" },
      { label: "Live news", page: "connect" },
    ],
    ask: "I'm moving to Rwanda. Tell me about cost of living, housing, work permits and daily life in Kigali.",
    accent: "from-teal-500 to-cyan-600",
  },
};

export function PersonaZone() {
  const { persona, setAiOpen, setAiSeed } = useApp();
  const c = CONTENT[persona] ?? CONTENT.tourist;
  const personaObj = PERSONAS.find((p) => p.id === persona) ?? PERSONAS[0];
  const Icon = ICONS[personaObj.icon] ?? Plane;

  const ask = () => {
    setAiSeed(c.ask);
    setAiOpen(true);
  };

  return (
    <section id="persona-zone" className="py-16 sm:py-20 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={persona}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${c.accent} p-8 sm:p-12 text-white shadow-xl`}
          >
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -right-4 bottom-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium mb-4">
                  <Icon className="h-3.5 w-3.5" /> You are a {personaObj.label}
                </div>
                <h2 className="text-2xl sm:text-4xl font-black leading-tight">{c.greeting}</h2>
                <p className="mt-3 text-white/90 max-w-2xl leading-relaxed">{c.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {c.quickLinks.map((l) => (
                    <button
                      key={l.label}
                      onClick={() => { useApp.getState().setPage(l.page as any); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/25 px-4 py-2 text-sm font-medium transition-colors"
                    >
                      {l.label} <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="shrink-0">
                <Button
                  size="lg"
                  onClick={ask}
                  className="bg-white text-gray-900 hover:bg-white/90 gap-2 shadow-lg"
                >
                  <Sparkles className="h-4 w-4" /> Ask RWANDA for help
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Persona selector strip */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-muted-foreground mr-1">Not you?</span>
          {PERSONAS.map((p) => {
            const PIcon = ICONS[p.icon] ?? Plane;
            const isActive = p.id === persona;
            return (
              <button
                key={p.id}
                onClick={() => useApp.setState({ persona: p.id as any })}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card hover:bg-accent border-border"
                }`}
              >
                <PIcon className="h-3.5 w-3.5" /> {p.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
