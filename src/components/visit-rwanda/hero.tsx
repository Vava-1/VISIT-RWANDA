"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Search, MapPin, ShieldCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IMAGES, PERSONAS, AI_SUGGESTIONS } from "@/lib/rwanda-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

const PERSONA_GRADIENTS: Record<string, string> = {
  tourist: "from-emerald-500 to-teal-600",
  investor: "from-amber-500 to-orange-600",
  student: "from-sky-500 to-blue-600",
  artist: "from-rose-500 to-pink-600",
  athlete: "from-violet-500 to-purple-600",
  expat: "from-teal-500 to-cyan-600",
};

export function Hero() {
  const { setAiOpen, setAiSeed, persona, setPersona } = useApp();
  const [query, setQuery] = React.useState("");

  const ask = (q: string) => {
    setAiSeed(q);
    setAiOpen(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    ask(query.trim() || "Tell me about Rwanda");
  };

  return (
    <section id="top" className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Rwanda, Land of a Thousand Hills"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 sm:pb-20 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full glass border border-white/20 px-4 py-1.5 text-xs font-medium text-white mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            The Heart of Africa · Open for the World
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]"
          >
            Visit <span className="gradient-text">Rwanda</span>
            <span className="block text-xl sm:text-3xl lg:text-4xl font-bold text-white/90 mt-3">
              Land of a Thousand Hills
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 text-base sm:text-xl text-white/85 max-w-2xl leading-relaxed"
          >
            Your intelligent gateway to Rwanda, for tourists, investors, students,
            artists, athletes and diaspora. Discover destinations, plan trips,
            explore opportunities and connect with a nation on the rise.
          </motion.p>

          {/* AI search */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about Rwanda: visas, gorillas, investing…"
                className="pl-11 h-12 sm:h-14 text-sm sm:text-base rounded-2xl glass border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 sm:h-14 px-5 sm:px-6 rounded-2xl gap-2 shadow-xl shrink-0">
              <Sparkles className="h-5 w-5" />
              Ask RWANDA
            </Button>
          </motion.form>

          {/* Suggestion chips */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-5 flex flex-wrap gap-2"
          >
            {AI_SUGGESTIONS.slice(0, 4).map((s) => (
              <button
                key={s}
                onClick={() => ask(s)}
                className="text-xs sm:text-sm text-white/80 hover:text-white glass border border-white/20 hover:border-white/40 rounded-full px-3.5 py-1.5 transition-colors"
              >
                {s}
              </button>
            ))}
          </motion.div>

          {/* Persona quick pick */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10"
          >
            <div className="text-xs uppercase tracking-[0.18em] text-white/60 mb-3 font-semibold">
              Personalise your experience
            </div>
            <div className="flex flex-wrap gap-2">
              {PERSONAS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setPersona(p.id as any);
                    useApp.getState().setPage("home");
                    setTimeout(() => document.getElementById("persona-zone")?.scrollIntoView({ behavior: "smooth" }), 50);
                  }}
                  className={cn(
                    "group relative rounded-full px-4 py-2 text-sm font-medium transition-all overflow-hidden",
                    persona === p.id
                      ? "ring-2 ring-white text-white"
                      : "text-white/85 hover:text-white"
                  )}
                >
                  <span
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r opacity-80 group-hover:opacity-100 transition-opacity",
                      PERSONA_GRADIENTS[p.id]
                    )}
                  />
                  <span className="relative">{p.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl"
        >
          {[
            { icon: TrendingUp, value: "8.9%", label: "GDP growth 2024 (NISR)", color: "text-emerald-300" },
            { icon: MapPin, value: "9.8%", label: "Tourism share of GDP", color: "text-amber-300" },
            { icon: ShieldCheck, value: "#1", label: "Safest in East Africa", color: "text-sky-300" },
            { icon: Sparkles, value: "1,000+", label: "Hills & experiences", color: "text-rose-300" },
          ].map((s) => (
            <div
              key={s.label}
              className="glass border border-white/15 rounded-2xl p-4"
            >
              <s.icon className={cn("h-5 w-5 mb-2", s.color)} />
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-xs text-white/70">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-white/60">
        <span className="text-[10px] uppercase tracking-[0.2em]">Explore</span>
        <ArrowRight className="h-4 w-4 rotate-90 animate-bounce" />
      </div>
    </section>
  );
}
