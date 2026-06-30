"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Ticket, Mountain, Sparkles, ArrowUpRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DESTINATIONS, type Destination } from "@/lib/rwanda-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<string, string> = {
  "National Park": "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  City: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
  Lake: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
  Cultural: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  Memorial: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
  Forest: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
};

export function Destinations() {
  const [active, setActive] = React.useState<Destination | null>(null);
  const [filter, setFilter] = React.useState<string>("All");
  const { setAiOpen, setAiSeed } = useApp();

  const categories = ["All", ...Array.from(new Set(DESTINATIONS.map((d) => d.category)))];
  const filtered = filter === "All" ? DESTINATIONS : DESTINATIONS.filter((d) => d.category === filter);

  const askAbout = (d: Destination) => {
    setAiSeed(`Tell me more about ${d.name}: how to visit, best time, costs and tips.`);
    setAiOpen(true);
  };

  return (
    <section id="discover" className="py-20 sm:py-28 bg-gradient-to-b from-background to-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <Badge variant="outline" className="mb-3 gap-1.5">
              <Mountain className="h-3.5 w-3.5" /> Discover Rwanda
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Every place worth <span className="gradient-text">a thousand stories</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              From mist-wrapped volcanoes and Big-Five savanna to Africa's cleanest capital and a
              lake of a thousand sunsets. Explore every corner of Rwanda.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "px-3.5 py-1.5 text-sm rounded-full border transition-all",
                  filter === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card hover:bg-accent border-border"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((d, i) => (
            <motion.button
              key={d.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              onClick={() => setActive(d)}
              className="group text-left rounded-3xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={d.image}
                  alt={d.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <Badge className={cn("absolute top-3 left-3 border", CATEGORY_STYLES[d.category])}>
                  {d.category}
                </Badge>
                {d.unesco && (
                  <Badge className="absolute top-3 right-3 bg-amber-500/90 text-white border-0">
                    UNESCO
                  </Badge>
                )}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1 text-xs text-white/80 mb-1">
                    <MapPin className="h-3 w-3" /> {d.region}
                  </div>
                  <h3 className="text-lg font-bold leading-tight">{d.name}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{d.tagline}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {d.bestTime.split("(")[0].trim()}
                  </span>
                  <span className="text-xs font-medium text-primary flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                    Explore <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden max-h-[90vh] gap-0">
          {active && (
            <>
              <div className="relative aspect-[16/9]">
                <img src={active.image} alt={active.name} className="h-full w-full object-cover" />
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <Badge className={cn("border mb-2", CATEGORY_STYLES[active.category])}>
                    {active.category}
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl font-black">{active.name}</h2>
                  <div className="flex items-center gap-1 text-sm text-white/80 mt-1">
                    <MapPin className="h-3.5 w-3.5" /> {active.region} ·{" "}
                    {active.coordinates.lat.toFixed(2)}, {active.coordinates.lng.toFixed(2)}
                  </div>
                </div>
              </div>
              <ScrollArea className="max-h-[50vh]">
                <div className="p-6 space-y-5">
                  <DialogHeader className="space-y-0">
                    <DialogTitle className="sr-only">{active.name}</DialogTitle>
                    <DialogDescription className="text-base text-foreground/80 leading-relaxed">
                      {active.description}
                    </DialogDescription>
                  </DialogHeader>

                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                      Highlights
                    </h4>
                    <ul className="grid gap-2">
                      {active.highlights.map((h) => (
                        <li key={h} className="flex gap-2 text-sm">
                          <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="rounded-xl bg-muted/60 p-4">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                        <Clock className="h-3.5 w-3.5" /> Best time to visit
                      </div>
                      <div className="text-sm font-medium">{active.bestTime}</div>
                    </div>
                    {active.permitFrom && (
                      <div className="rounded-xl bg-muted/60 p-4">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                          <Ticket className="h-3.5 w-3.5" /> From
                        </div>
                        <div className="text-sm font-medium">{active.permitFrom}</div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button className="flex-1 gap-2" onClick={() => askAbout(active)}>
                      <Sparkles className="h-4 w-4" /> Ask Aiya about {active.name}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={() => {
                        setAiSeed(`Build me a 3-day itinerary centred on ${active.name}.`);
                        setAiOpen(true);
                      }}
                    >
                      <MapPin className="h-4 w-4" /> Plan a trip here
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
