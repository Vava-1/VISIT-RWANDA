"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Plane, TrendingUp, GraduationCap, Palette, Trophy, Home as HomeIcon,
  Sparkles, ArrowRight, type LucideIcon,
} from "lucide-react";
import { FlagRwanda } from "@/components/visit-rwanda/flag-rwanda";
import { useApp } from "@/lib/store";
import { PERSONAS, IMAGES, type PersonaId } from "@/lib/rwanda-data";

const ICONS: Record<string, LucideIcon> = {
  Plane, TrendingUp, GraduationCap, Palette, Trophy, Home: HomeIcon,
};

const PERSONA_GRADIENTS: Record<string, string> = {
  tourist: "from-emerald-500 to-teal-600",
  investor: "from-amber-500 to-orange-600",
  student: "from-sky-500 to-blue-600",
  artist: "from-rose-500 to-pink-600",
  athlete: "from-violet-500 to-purple-600",
  expat: "from-teal-500 to-cyan-600",
};

export function EntryGate() {
  const { setPersona, setHasChosenPersona } = useApp();

  const choose = (id: PersonaId) => {
    setPersona(id);
    setHasChosenPersona(true);
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Rwanda landscape"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-12 w-full">
        {/* Logo + intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="relative h-12 w-16 shrink-0">
              <div className="absolute inset-0 rounded-lg overflow-hidden shadow-xl ring-1 ring-white/30">
                <FlagRwanda />
              </div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Visit <span className="gradient-text">Rwanda</span>
          </h1>
          <p className="mt-2 text-lg sm:text-xl text-white/80 font-medium">
            Land of a Thousand Hills
          </p>
          <p className="mt-5 text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Welcome. To give you the right experience, tell us who you are.
            Choose your path below.
          </p>
        </motion.div>

        {/* Persona grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PERSONAS.map((p, i) => {
            const Icon = ICONS[p.icon] ?? Plane;
            const gradient = PERSONA_GRADIENTS[p.id];
            return (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                whileHover={{ y: -4 }}
                onClick={() => choose(p.id as PersonaId)}
                className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 p-5 text-left transition-all"
              >
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity`} />

                <div className="relative flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-white text-lg leading-tight">{p.label}</h3>
                      <ArrowRight className="h-4 w-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                    <p className="text-sm text-white/70 mt-1 leading-snug">{p.tagline}</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-white/50 mt-8"
        >
          You can change your choice anytime. This is an independent guide, not affiliated with the Government of Rwanda.
        </motion.p>
      </div>
    </section>
  );
}
