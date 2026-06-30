"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Clock, BadgeDollarSign, Sparkles, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EXPERIENCES } from "@/lib/rwanda-data";
import { useApp } from "@/lib/store";

export function Experiences() {
  const { setAiOpen, setAiSeed } = useApp();
  const ask = (q: string) => {
    setAiSeed(q);
    setAiOpen(true);
  };

  return (
    <section id="experiences" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <Badge variant="outline" className="mb-3 gap-1.5">
              <Compass className="h-3.5 w-3.5" /> Signature Experiences
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Moments that <span className="gradient-text">stay with you</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Curated, once in a lifetime Rwandan experiences: from gorilla encounters to canopy walks
              and lakeside coffee trails.
            </p>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory -mx-4 px-4">
          {EXPERIENCES.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="snap-start shrink-0 w-[300px] sm:w-[340px] rounded-3xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={e.image}
                  alt={e.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <Badge className="absolute top-3 left-3 bg-white/90 text-black border-0">
                  {e.category}
                </Badge>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-xl font-bold leading-tight">{e.title}</h3>
                  <p className="text-sm text-white/85 mt-1.5 line-clamp-3">{e.description}</p>
                  <div className="flex items-center gap-4 mt-4 text-xs">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {e.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BadgeDollarSign className="h-3.5 w-3.5" /> from {e.priceFrom}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-1.5"
                  onClick={() => ask(`I'm interested in "${e.title}". Tell me what's included, the price, how to book and the best season.`)}
                >
                  <Sparkles className="h-4 w-4 text-primary" /> Plan this experience
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
