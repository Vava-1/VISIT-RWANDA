"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, Landmark, Cpu, Sprout, Gem, Zap, Mountain,
  ArrowUpRight, BadgeCheck, Globe2,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, BarChart, Bar, Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  INVESTMENT_SECTORS, ECONOMY_STATS, ECONOMY_CHART,
} from "@/lib/rwanda-data";
import { useApp } from "@/lib/store";

const SECTOR_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu, Mountain, Sprout, Landmark, Gem, Zap,
};

const STAT_TILES = [
  { label: "GDP (2024)", value: ECONOMY_STATS.gdp2024, icon: TrendingUp },
  { label: "GDP Growth", value: ECONOMY_STATS.gdpGrowth, icon: ArrowUpRight },
  { label: "Tourism Share", value: ECONOMY_STATS.tourismGdp, icon: Mountain },
  { label: "Doing Business", value: "Top in Africa", icon: BadgeCheck },
];

export function Invest() {
  const { setAiOpen, setAiSeed } = useApp();
  const ask = (q: string) => {
    setAiSeed(q);
    setAiOpen(true);
  };

  return (
    <section id="invest" className="py-20 sm:py-28 bg-gradient-to-b from-amber-50/40 to-background dark:from-amber-950/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-3 gap-1.5">
            <TrendingUp className="h-3.5 w-3.5" /> Invest in Rwanda
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Africa's <span className="gradient-text">rising star</span> for investment
          </h2>
          <p className="mt-3 text-muted-foreground">
            One of the continent's fastest-growing economies, the easiest place to do business in
            East Africa, and the least corrupt. It is backed by the Kigali International Financial Centre
            and Vision 2050.
          </p>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STAT_TILES.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <s.icon className="h-6 w-6 text-amber-500 mb-3" />
                  <div className="text-2xl font-black">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-5 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-emerald-500" /> GDP growth (US$ billions)
              </CardTitle>
              <CardDescription>Rwanda's economy has expanded steadily through the 2020s.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={ECONOMY_CHART} margin={{ left: -18, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="gdpFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="year" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--popover)", color: "var(--popover-foreground)" }}
                  />
                  <Area type="monotone" dataKey="gdp" stroke="var(--color-chart-1)" strokeWidth={2.5} fill="url(#gdpFill)" name="GDP (US$B)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Mountain className="h-4 w-4 text-sky-500" /> Tourism receipts (US$ billions)
              </CardTitle>
              <CardDescription>A strong recovery and new record in 2024.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={ECONOMY_CHART} margin={{ left: -18, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="year" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--popover)", color: "var(--popover-foreground)" }}
                  />
                  <Bar dataKey="tourism" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} name="Tourism (US$B)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sectors */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Priority investment sectors</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INVESTMENT_SECTORS.map((s, i) => {
              const Icon = SECTOR_ICONS[s.icon] ?? Cpu;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.08 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow group">
                    <CardHeader>
                      <div className="h-11 w-11 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-1">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{s.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{s.whyRwanda}</p>
                      <Accordion type="single" collapsible>
                        <AccordionItem value={`inc-${s.id}`} className="border-0">
                          <AccordionTrigger className="text-sm py-2">Incentives</AccordionTrigger>
                          <AccordionContent>
                            <ul className="text-xs space-y-1.5">
                              {s.incentives.map((inc) => (
                                <li key={inc} className="flex gap-1.5">
                                  <BadgeCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                  {inc}
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full gap-1.5 group-hover:gap-2.5 transition-all"
                        onClick={() => ask(`I'm an investor interested in ${s.name} in Rwanda. Give me the opportunities, incentives, requirements and next steps via the Rwanda Development Board.`)}
                      >
                        Explore <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* KIFC banner */}
        <Card className="overflow-hidden border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent">
          <CardContent className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="h-14 w-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Globe2 className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">Kigali International Financial Centre (KIFC)</h3>
              <p className="text-sm text-muted-foreground mt-1">
                A Common Law, English speaking financial hub serving the region, with a 0% withholding
                tax on dividends and a 5% corporate income tax for qualifying entities.
              </p>
            </div>
            <Button className="gap-2 shrink-0" onClick={() => ask("Explain the Kigali International Financial Centre (KIFC) tax regime and how a foreign investor can set up.")}>
              Learn about KIFC <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
