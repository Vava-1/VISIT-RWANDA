"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse, Pill, Stethoscope, Users, CalendarDays, Sparkles,
  MapPin, Phone, Clock, HeartHandshake, Search, ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { useApp } from "@/lib/store";
import {
  HEALTH_FACILITIES, COMMUNITY_LIFE, HEALTH_TIPS,
  type HealthFacility, type CommunityEvent,
} from "@/lib/rwanda-data";
import { cn } from "@/lib/utils";

const TYPE_META: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  Hospital: { icon: HeartPulse, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500/10" },
  Clinic: { icon: Stethoscope, color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-500/10" },
  Pharmacy: { icon: Pill, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10" },
};

const KIND_META: Record<string, { icon: LucideIcon; color: string; bg: string; label: string }> = {
  Practice: { icon: Users, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10", label: "Community Practice" },
  Event: { icon: CalendarDays, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10", label: "Recurring Event" },
  "National Day": { icon: HeartHandshake, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500/10", label: "National Day" },
};

export function HealthCommunity() {
  const { setAiOpen, setAiSeed } = useApp();
  const [query, setQuery] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("All");
  const [activeFacility, setActiveFacility] = React.useState<HealthFacility | null>(null);
  const [activeEvent, setActiveEvent] = React.useState<CommunityEvent | null>(null);

  const askAbout = (name: string, detail: string) => {
    setAiSeed(`${detail} about ${name} in Rwanda.`);
    setAiOpen(true);
  };

  const filteredFacilities = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return HEALTH_FACILITIES.filter((f) => {
      if (typeFilter !== "All" && f.type !== typeFilter) return false;
      if (!q) return true;
      return (
        f.name.toLowerCase().includes(q) ||
        f.location.toLowerCase().includes(q) ||
        f.province.toLowerCase().includes(q) ||
        f.services.join(" ").toLowerCase().includes(q)
      );
    });
  }, [query, typeFilter]);

  return (
    <section id="health-community" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="outline" className="mb-3 gap-1.5">
            <HeartPulse className="h-3.5 w-3.5 text-rose-500" /> Health & Community Life
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Care for visitors, <span className="gradient-text">heart of the nation</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Find hospitals, clinics and pharmacies across Rwanda, and discover the community
            practices, events and national days that define Rwandan civic life.
          </p>
        </div>

        <Tabs defaultValue="health">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-auto">
            <TabsTrigger value="health" className="gap-1.5 py-2.5">
              <HeartPulse className="h-4 w-4" /> Health Facilities
            </TabsTrigger>
            <TabsTrigger value="community" className="gap-1.5 py-2.5">
              <Users className="h-4 w-4" /> Community & Days
            </TabsTrigger>
          </TabsList>

          {/* ---------- HEALTH FACILITIES ---------- */}
          <TabsContent value="health" className="mt-8">
            {/* Search + filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, city, province or service…"
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                {["All", "Hospital", "Clinic", "Pharmacy"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={cn(
                      "px-3.5 py-1.5 text-xs sm:text-sm rounded-full border transition-all whitespace-nowrap",
                      typeFilter === t
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card hover:bg-accent border-border"
                    )}
                  >
                    {t}{t !== "All" && `s`}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-sm text-muted-foreground mb-4">
              {filteredFacilities.length} facilit{filteredFacilities.length === 1 ? "y" : "ies"}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredFacilities.map((f, i) => {
                const meta = TYPE_META[f.type] ?? TYPE_META.Hospital;
                return (
                  <motion.div
                    key={f.id}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.06 }}
                  >
                    <Card className="h-full overflow-hidden p-0 hover:shadow-lg transition-shadow group flex flex-col">
                      <button
                        onClick={() => setActiveFacility(f)}
                        className="relative aspect-[16/10] overflow-hidden block"
                      >
                        <img
                          src={f.image}
                          alt={f.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                        <div className={cn("absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-xs font-semibold flex items-center gap-1.5", meta.bg, meta.color)}>
                          <meta.icon className="h-3.5 w-3.5" /> {f.type}
                        </div>
                        <div className="absolute bottom-2.5 left-3 right-3 text-white text-left">
                          <h3 className="font-bold leading-tight text-base line-clamp-2">{f.name}</h3>
                          <div className="flex items-center gap-1 text-[11px] text-white/85 mt-0.5">
                            <MapPin className="h-3 w-3" /> <span className="line-clamp-1">{f.location}</span>
                          </div>
                        </div>
                      </button>
                      <CardContent className="p-4 flex flex-col flex-1">
                        <div className="text-[11px] text-muted-foreground mb-1.5">{f.level}</div>
                        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{f.description}</p>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1" onClick={() => setActiveFacility(f)}>
                            Details
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 gap-1.5"
                            onClick={() => askAbout(f.name, `Give me details, location, contact and what I should know`)}
                          >
                            <Sparkles className="h-3.5 w-3.5" /> Ask RWANDA
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {filteredFacilities.length === 0 && (
              <Card className="p-10 text-center text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-3 opacity-40" />
                No facilities match your search.
              </Card>
            )}

            {/* Health tips strip */}
            <Card className="mt-8 bg-gradient-to-r from-rose-500/5 to-transparent border-rose-500/20">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <HeartPulse className="h-5 w-5 text-rose-500" /> Health tips for visitors
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {HEALTH_TIPS.map((t) => (
                    <div key={t.title} className="rounded-xl bg-muted/40 p-3">
                      <div className="font-semibold text-sm mb-1">{t.title}</div>
                      <div className="text-xs text-muted-foreground">{t.text}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ---------- COMMUNITY & NATIONAL DAYS ---------- */}
          <TabsContent value="community" className="mt-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {COMMUNITY_LIFE.map((e, i) => {
                const meta = KIND_META[e.kind] ?? KIND_META.Event;
                return (
                  <motion.div
                    key={e.id}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.06 }}
                  >
                    <Card className="h-full overflow-hidden p-0 hover:shadow-lg transition-shadow group flex flex-col">
                      <button
                        onClick={() => setActiveEvent(e)}
                        className="relative aspect-[16/10] overflow-hidden block"
                      >
                        <img
                          src={e.image}
                          alt={e.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                        <div className={cn("absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-xs font-semibold flex items-center gap-1.5", meta.bg, meta.color)}>
                          <meta.icon className="h-3.5 w-3.5" /> {meta.label}
                        </div>
                        <div className="absolute bottom-2.5 left-3 right-3 text-white text-left">
                          <h3 className="font-bold leading-tight text-base line-clamp-2">{e.name}</h3>
                          <div className="flex items-center gap-1 text-[11px] text-white/85 mt-0.5">
                            <CalendarDays className="h-3 w-3" /> <span className="line-clamp-1">{e.frequency}</span>
                          </div>
                        </div>
                      </button>
                      <CardContent className="p-4 flex flex-col flex-1">
                        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{e.description}</p>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1" onClick={() => setActiveEvent(e)}>
                            Learn more
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 gap-1.5"
                            onClick={() => askAbout(e.name, `Explain and give practical details`)}
                          >
                            <Sparkles className="h-3.5 w-3.5" /> Ask RWANDA
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Facility detail dialog */}
      <Dialog open={!!activeFacility} onOpenChange={(o) => !o && setActiveFacility(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[90vh] gap-0">
          {activeFacility && (
            <>
              <div className="relative aspect-[16/9]">
                <img src={activeFacility.image} alt={activeFacility.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <Badge className="bg-white/90 text-black border-0 mb-2">{activeFacility.type} · {activeFacility.level}</Badge>
                  <h2 className="text-2xl font-black leading-tight">{activeFacility.name}</h2>
                  <div className="flex items-center gap-1 text-sm text-white/85 mt-1">
                    <MapPin className="h-3.5 w-3.5" /> {activeFacility.location}, {activeFacility.province}
                  </div>
                </div>
              </div>
              <ScrollArea className="max-h-[48vh]">
                <div className="p-6 space-y-5">
                  <DialogHeader className="space-y-0">
                    <DialogTitle className="sr-only">{activeFacility.name}</DialogTitle>
                    <DialogDescription className="text-base text-foreground/80 leading-relaxed">
                      {activeFacility.description}
                    </DialogDescription>
                  </DialogHeader>

                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                      Services
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeFacility.services.map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {activeFacility.emergency && (
                      <div className="rounded-xl bg-rose-500/10 p-3">
                        <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 mb-1 font-medium">
                          <Phone className="h-3.5 w-3.5" /> Emergency
                        </div>
                        <div className="text-sm font-semibold">{activeFacility.emergency}</div>
                      </div>
                    )}
                    {activeFacility.contact && (
                      <div className="rounded-xl bg-muted/60 p-3">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                          <Phone className="h-3.5 w-3.5" /> Contact
                        </div>
                        <div className="text-sm font-medium">{activeFacility.contact}</div>
                      </div>
                    )}
                    {activeFacility.hours && (
                      <div className="rounded-xl bg-muted/60 p-3 sm:col-span-2">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                          <Clock className="h-3.5 w-3.5" /> Hours
                        </div>
                        <div className="text-sm font-medium">{activeFacility.hours}</div>
                      </div>
                    )}
                  </div>

                  <Button className="w-full gap-2" onClick={() => askAbout(activeFacility.name, "Give me all details, directions, services and what a visitor should know")}>
                    <Sparkles className="h-4 w-4" /> Ask RWANDA about {activeFacility.name}
                  </Button>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Community event detail dialog */}
      <Dialog open={!!activeEvent} onOpenChange={(o) => !o && setActiveEvent(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[90vh] gap-0">
          {activeEvent && (
            <>
              <div className="relative aspect-[16/9]">
                <img src={activeEvent.image} alt={activeEvent.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <Badge className="bg-white/90 text-black border-0 mb-2">{activeEvent.kind}</Badge>
                  <h2 className="text-2xl font-black leading-tight">{activeEvent.name}</h2>
                  <div className="flex items-center gap-1 text-sm text-white/85 mt-1">
                    <CalendarDays className="h-3.5 w-3.5" /> {activeEvent.frequency}
                  </div>
                </div>
              </div>
              <ScrollArea className="max-h-[48vh]">
                <div className="p-6 space-y-5">
                  <DialogHeader className="space-y-0">
                    <DialogTitle className="sr-only">{activeEvent.name}</DialogTitle>
                    <DialogDescription className="text-base text-foreground/80 leading-relaxed">
                      {activeEvent.description}
                    </DialogDescription>
                  </DialogHeader>

                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                      What to know
                    </h4>
                    <ul className="space-y-1.5">
                      {activeEvent.details.map((d) => (
                        <li key={d} className="text-sm text-muted-foreground flex gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" /> {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/20">
                    <div className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
                      Why it matters
                    </div>
                    <div className="text-sm text-foreground/80 leading-relaxed">{activeEvent.impact}</div>
                  </div>

                  <Button className="w-full gap-2" onClick={() => askAbout(activeEvent.name, "Explain and tell me how as a visitor I can take part or what to expect")}>
                    <Sparkles className="h-4 w-4" /> Ask RWANDA about {activeEvent.name}
                  </Button>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
