"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  MapPin, Users, Bus, Car, Bike, Ship, Search, Sparkles, BadgeDollarSign,
  Building2, type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/lib/store";
import { CITIES, TRANSPORT, type TransportOption } from "@/lib/rwanda-data";
import { cn } from "@/lib/utils";

const TYPE_META: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  Bus: { icon: Bus, color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-500/10" },
  "Car Hire": { icon: Car, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10" },
  "Moto-Taxi": { icon: Bike, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10" },
  "Ride-Hailing": { icon: Car, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-500/10" },
  Boat: { icon: Ship, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10" },
};

export function CitiesTransport() {
  const { setAiOpen, setAiSeed } = useApp();
  const [cityQuery, setCityQuery] = React.useState("");
  const [provinceFilter, setProvinceFilter] = React.useState("All");
  const [transportType, setTransportType] = React.useState("All");

  const provinces = ["All", ...Array.from(new Set(CITIES.map((c) => c.province)))];

  const filteredCities = React.useMemo(() => {
    const q = cityQuery.trim().toLowerCase();
    return CITIES.filter((c) => {
      if (provinceFilter !== "All" && c.province !== provinceFilter) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.highlights.join(" ").toLowerCase().includes(q)
      );
    });
  }, [cityQuery, provinceFilter]);

  const transportTypes = ["All", ...Array.from(new Set(TRANSPORT.map((t) => t.type)))];
  const filteredTransport = React.useMemo(() => {
    if (transportType === "All") return TRANSPORT;
    return TRANSPORT.filter((t) => t.type === transportType);
  }, [transportType]);

  const askAbout = (q: string) => {
    setAiSeed(q);
    setAiOpen(true);
  };

  return (
    <section id="cities" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="outline" className="mb-3 gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" /> Cities & Transport
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Every city, every <span className="gradient-text">way to get there</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Explore all of Rwanda's cities and the buses, cars, motos and boats that connect them.
          </p>
        </div>

        <Tabs defaultValue="cities">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-auto">
            <TabsTrigger value="cities" className="gap-1.5 py-2.5">
              <Building2 className="h-4 w-4" /> Cities
            </TabsTrigger>
            <TabsTrigger value="transport" className="gap-1.5 py-2.5">
              <Bus className="h-4 w-4" /> Transport
            </TabsTrigger>
          </TabsList>

          {/* CITIES TAB */}
          <TabsContent value="cities" className="mt-8">
            {/* Search + province filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={cityQuery}
                  onChange={(e) => setCityQuery(e.target.value)}
                  placeholder="Search cities by name or highlight…"
                  className="pl-9"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {provinces.map((p) => (
                  <button
                    key={p}
                    onClick={() => setProvinceFilter(p)}
                    className={cn(
                      "px-3 py-1.5 text-xs sm:text-sm rounded-full border transition-all whitespace-nowrap",
                      provinceFilter === p
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card hover:bg-accent border-border"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-sm text-muted-foreground mb-4">
              {filteredCities.length} {filteredCities.length === 1 ? "city" : "cities"}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCities.map((c, i) => (
                <motion.div
                  key={c.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.06 }}
                >
                  <Card className="h-full overflow-hidden p-0 hover:shadow-lg transition-shadow group flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={c.image}
                        alt={c.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                      <Badge className="absolute top-2.5 left-2.5 bg-white/90 text-black border-0 text-xs">
                        {c.province}
                      </Badge>
                      <div className="absolute bottom-2.5 left-3 right-3 text-white">
                        <h3 className="font-bold leading-tight text-base">{c.name}</h3>
                        <div className="flex items-center gap-1 text-[11px] text-white/85 mt-0.5">
                          <Users className="h-3 w-3" /> {c.population}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4 flex flex-col flex-1">
                      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{c.description}</p>
                      <div className="mt-3">
                        <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Highlights</div>
                        <div className="flex flex-wrap gap-1">
                          {c.highlights.slice(0, 3).map((h) => (
                            <Badge key={h} variant="secondary" className="text-[10px] py-0.5">{h}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-3 rounded-lg bg-muted/50 p-2 text-[11px] text-muted-foreground">
                        <span className="font-medium text-foreground">Transport:</span> {c.transportHub}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3 w-full gap-1.5"
                        onClick={() => askAbout(`Tell me about ${c.name} in Rwanda: what to see, how to get there, where to stay, and what to do.`)}
                      >
                        <Sparkles className="h-3.5 w-3.5 text-primary" /> Ask RWANDA about {c.name}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* TRANSPORT TAB */}
          <TabsContent value="transport" className="mt-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {transportTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setTransportType(t)}
                  className={cn(
                    "px-3.5 py-1.5 text-xs sm:text-sm rounded-full border transition-all",
                    transportType === t
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card hover:bg-accent border-border"
                  )}
                >
                  {t}{t !== "All" && "s"}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTransport.map((t, i) => {
                const meta = TYPE_META[t.type] ?? TYPE_META.Bus;
                return (
                  <motion.div
                    key={t.id}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.06 }}
                  >
                    <Card className="h-full overflow-hidden p-0 hover:shadow-lg transition-shadow group flex flex-col">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={t.image}
                          alt={t.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                        <div className={cn("absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-xs font-semibold flex items-center gap-1.5", meta.bg, meta.color)}>
                          <meta.icon className="h-3.5 w-3.5" /> {t.type}
                        </div>
                        <div className="absolute bottom-2.5 left-3 right-3 text-white">
                          <h3 className="font-bold leading-tight text-base">{t.name}</h3>
                        </div>
                      </div>
                      <CardContent className="p-4 flex flex-col flex-1">
                        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{t.description}</p>
                        {t.priceFrom && (
                          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <BadgeDollarSign className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            <span className="line-clamp-1">{t.priceFrom}</span>
                          </div>
                        )}
                        <div className="mt-2">
                          <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Serves</div>
                          <div className="flex flex-wrap gap-1">
                            {t.citiesServed.slice(0, 5).map((city) => (
                              <Badge key={city} variant="secondary" className="text-[10px] py-0.5">{city}</Badge>
                            ))}
                            {t.citiesServed.length > 5 && (
                              <Badge variant="outline" className="text-[10px] py-0.5">+{t.citiesServed.length - 5}</Badge>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 rounded-lg bg-muted/50 p-2 text-[11px] text-muted-foreground">
                          {t.notes}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-3 w-full gap-1.5"
                          onClick={() => askAbout(`How do I travel with ${t.name} in Rwanda? Give me routes, prices, how to book, and tips.`)}
                        >
                          <Sparkles className="h-3.5 w-3.5 text-primary" /> Ask RWANDA
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
