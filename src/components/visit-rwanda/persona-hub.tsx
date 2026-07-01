"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, BadgeDollarSign, Globe, Sparkles, Search, Building2,
  Plane, TrendingUp, GraduationCap, Palette, Trophy, Home as HomeIcon,
  ExternalLink, type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useApp } from "@/lib/store";
import { PERSONA_HUBS, type Institution } from "@/lib/rwanda-data";
import { cn } from "@/lib/utils";

const HUB_ICONS: Record<string, LucideIcon> = {
  Plane, TrendingUp, GraduationCap, Palette, Trophy, Home: HomeIcon,
};

export function PersonaHub() {
  const { persona, setAiOpen, setAiSeed } = useApp();
  const hub = PERSONA_HUBS[persona] ?? PERSONA_HUBS.tourist;
  const HubIcon = HUB_ICONS[hub.icon] ?? Building2;

  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState<Institution | null>(null);

  // Reset query/active when persona changes
  React.useEffect(() => {
    setQuery("");
    setActive(null);
  }, [persona]);

  // Categories derived from the current hub
  const categories = React.useMemo(() => {
    const set = new Set(hub.institutions.map((i) => i.category));
    return ["All", ...Array.from(set)];
  }, [hub]);

  const [category, setCategory] = React.useState("All");
  React.useEffect(() => setCategory("All"), [persona]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return hub.institutions.filter((i) => {
      if (category !== "All" && i.category !== category) return false;
      if (!q) return true;
      return (
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q)
      );
    });
  }, [hub, query, category]);

  const askAbout = (inst: Institution) => {
    setAiSeed(
      `Give me detailed information about ${inst.name} in Rwanda: what it offers, location, fees/prices, how to apply or visit, contact and website, and anything else I should know.`
    );
    setAiOpen(true);
  };

  return (
    <section id="hub" className="py-20 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={persona}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
              <div>
                <Badge variant="outline" className="mb-3 gap-1.5">
                  <HubIcon className="h-3.5 w-3.5 text-primary" /> {hub.title}
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                  Browse Rwanda's <span className="gradient-text">{hub.title.toLowerCase()}</span>
                </h2>
                <p className="mt-2 text-muted-foreground max-w-2xl">{hub.subtitle}</p>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, place, type…"
                  className="pl-9"
                />
              </div>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "px-3.5 py-1.5 text-xs sm:text-sm rounded-full border transition-all",
                    category === c
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card hover:bg-accent border-border"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Results count */}
            <div className="text-sm text-muted-foreground mb-4">
              {filtered.length} {filtered.length === 1 ? "result" : "results"}
              {category !== "All" && <> in <strong className="text-foreground">{category}</strong></>}
            </div>

            {/* Institution grid */}
            {filtered.length === 0 ? (
              <Card className="p-10 text-center text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-3 opacity-40" />
                No results. Try a different search or category.
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((inst, i) => (
                  <motion.div
                    key={inst.id}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: (i % 3) * 0.06 }}
                  >
                    <Card className="h-full overflow-hidden p-0 hover:shadow-lg transition-shadow group flex flex-col">
                      <button
                        onClick={() => setActive(inst)}
                        className="relative aspect-[16/10] overflow-hidden block"
                      >
                        <img
                          src={inst.image}
                          alt={inst.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <Badge className="absolute top-2.5 left-2.5 bg-white/90 text-black border-0 text-xs">
                          {inst.category}
                        </Badge>
                        <div className="absolute bottom-2.5 left-3 right-3 text-white text-left">
                          <h3 className="font-bold leading-tight text-base line-clamp-2">{inst.name}</h3>
                          <div className="flex items-center gap-1 text-[11px] text-white/85 mt-0.5">
                            <MapPin className="h-3 w-3" /> <span className="line-clamp-1">{inst.location}</span>
                          </div>
                        </div>
                      </button>
                      <CardContent className="p-4 flex flex-col flex-1">
                        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{inst.description}</p>
                        {inst.fees && (
                          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <BadgeDollarSign className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            <span className="line-clamp-1">{inst.fees.split(".")[0].split(";")[0].slice(0, 70)}</span>
                          </div>
                        )}
                        <div className="mt-3 flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 gap-1.5"
                            onClick={() => setActive(inst)}
                          >
                            Details
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 gap-1.5"
                            onClick={() => askAbout(inst)}
                          >
                            <Sparkles className="h-3.5 w-3.5" /> Ask RWANDA
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Detail dialog */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[90vh] gap-0">
          {active && (
            <>
              <div className="relative aspect-[16/9]">
                <img src={active.image} alt={active.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <Badge className="bg-white/90 text-black border-0 mb-2">{active.category}</Badge>
                  <h2 className="text-2xl font-black leading-tight">{active.name}</h2>
                  <div className="flex items-center gap-1 text-sm text-white/85 mt-1">
                    <MapPin className="h-3.5 w-3.5" /> {active.location}
                  </div>
                </div>
              </div>
              <ScrollArea className="max-h-[48vh]">
                <div className="p-6 space-y-5">
                  <DialogHeader className="space-y-0">
                    <DialogTitle className="sr-only">{active.name}</DialogTitle>
                    <DialogDescription className="text-base text-foreground/80 leading-relaxed">
                      {active.description}
                    </DialogDescription>
                  </DialogHeader>

                  {active.highlights.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                        Key highlights
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {active.highlights.map((h) => (
                          <Badge key={h} variant="secondary" className="text-xs">{h}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-3">
                    {active.fees && (
                      <div className="rounded-xl bg-muted/60 p-3">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                          <BadgeDollarSign className="h-3.5 w-3.5" /> Fees / Pricing
                        </div>
                        <div className="text-sm font-medium leading-snug">{active.fees}</div>
                      </div>
                    )}
                    {active.contact && (
                      <div className="rounded-xl bg-muted/60 p-3">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                          <MapPin className="h-3.5 w-3.5" /> Contact
                        </div>
                        <div className="text-sm font-medium">{active.contact}</div>
                      </div>
                    )}
                    {active.website && (
                      <div className="rounded-xl bg-muted/60 p-3 sm:col-span-2">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                          <Globe className="h-3.5 w-3.5" /> Website
                        </div>
                        <a
                          href={`https://${active.website.replace(/^https?:\/\//, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                        >
                          {active.website} <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <Button className="flex-1 gap-2" onClick={() => askAbout(active)}>
                      <Sparkles className="h-4 w-4" /> Ask RWANDA about {active.name}
                    </Button>
                    {active.website && (
                      <Button
                        variant="outline"
                        className="flex-1 gap-2"
                        onClick={() => {
                          const url = active.website!.replace(/^https?:\/\//, "");
                          window.open(`https://${url}`, "_blank", "noopener,noreferrer");
                        }}
                      >
                        <Globe className="h-4 w-4" /> Visit website
                      </Button>
                    )}
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
