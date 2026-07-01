"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Palette, Trophy, GraduationCap, Bike, Dribbble, Award,
  Sparkles, Quote, ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IMAGES, CULTURE, SPORTS, EDUCATION } from "@/lib/rwanda-data";
import { useApp } from "@/lib/store";

export function LiveSection() {
  const { setAiOpen, setAiSeed, persona } = useApp();
  const ask = (q: string) => {
    setAiSeed(q);
    setAiOpen(true);
  };

  // Hint default tab based on persona
  const defaultTab =
    persona === "athlete" ? "sports" : persona === "student" ? "education" : "culture";

  return (
    <section id="live" className="py-20 sm:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="outline" className="mb-3 gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> Live & Thrive
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Culture, sport & <span className="gradient-text">learning</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Rwanda pulses with creative energy, athletic ambition and a deep commitment to learning.
            for artists, athletes, students and everyone in between.
          </p>
        </div>

        <Tabs defaultValue={defaultTab}>
          <TabsList className="grid w-full grid-cols-3 h-auto max-w-md mx-auto">
            <TabsTrigger value="culture" className="gap-1.5 py-2.5">
              <Palette className="h-4 w-4" /> Culture
            </TabsTrigger>
            <TabsTrigger value="sports" className="gap-1.5 py-2.5">
              <Trophy className="h-4 w-4" /> Sport
            </TabsTrigger>
            <TabsTrigger value="education" className="gap-1.5 py-2.5">
              <GraduationCap className="h-4 w-4" /> Learn
            </TabsTrigger>
          </TabsList>

          {/* CULTURE */}
          <TabsContent value="culture" className="mt-8 space-y-8">
            <div className="grid lg:grid-cols-2 gap-6 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl"
              >
                <img src={IMAGES.culture} alt="Rwandan culture" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-5 text-white">
                  <div className="text-xs uppercase tracking-wide opacity-80">Intore, Dance of Heroes</div>
                </div>
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold mb-4">A living heritage</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {CULTURE.heritage.map((h) => (
                    <Card key={h.title} className="p-4">
                      <h4 className="font-semibold text-sm">{h.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{h.text}</p>
                    </Card>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  {CULTURE.creativeEconomy}
                </p>
                <button
                  onClick={() => ask("Tell me about Rwanda's creative economy, key art institutions and how artists can get involved.")}
                  className="mt-4 text-sm font-medium text-primary hover:underline flex items-center gap-1"
                >
                  Explore the creative economy <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Institutions & festivals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {CULTURE.institutions.map((c) => (
                    <Badge key={c} variant="secondary" className="text-xs py-1.5">
                      {c}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SPORTS */}
          <TabsContent value="sports" className="mt-8 space-y-8">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <img src={IMAGES.cycling} alt="Tour du Rwanda" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs opacity-90">
                      <Bike className="h-3.5 w-3.5" /> UCI 2.Pro
                    </div>
                    <div className="font-bold text-lg">Tour du Rwanda</div>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <ul className="space-y-1.5">
                    {SPORTS.cycling.facts.map((f) => (
                      <li key={f} className="text-sm text-muted-foreground flex gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Dribbble className="h-4 w-4 text-emerald-500" /> Football
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{SPORTS.football.overview}</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {SPORTS.football.clubs.map((c) => (
                        <div key={c.name} className="rounded-lg bg-muted/60 p-3">
                          <div className="font-semibold text-sm">{c.name}</div>
                          <div className="text-xs text-muted-foreground">{c.city} · {c.titles}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{c.note}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground border-t pt-2">
                      <strong className="text-foreground">National:</strong> {SPORTS.football.national}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Award className="h-4 w-4 text-amber-500" /> Basketball
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{SPORTS.basketball.overview}</p>
                    <ul className="space-y-1">
                      {SPORTS.basketball.facts.map((f) => (
                        <li key={f} className="text-sm text-muted-foreground flex gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-2 shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4">
                    <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Also popular</div>
                    <div className="flex flex-wrap gap-2">
                      {SPORTS.other.map((o) => (
                        <Badge key={o} variant="outline" className="text-xs">{o}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* EDUCATION */}
          <TabsContent value="education" className="mt-8 space-y-6">
            <Card className="bg-gradient-to-r from-sky-500/5 to-transparent border-sky-500/20">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <Quote className="h-8 w-8 text-sky-500 shrink-0" />
                  <p className="text-sm leading-relaxed">{EDUCATION.facts}</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-sky-500" /> Universities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {EDUCATION.universities.map((u) => (
                      <li key={u.name} className="flex gap-2 text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                        <span>
                          <strong className="text-foreground">{u.name}</strong>
                          <span className="text-muted-foreground">, {u.note}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-sky-500" /> Research institutions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {EDUCATION.research.map((r) => (
                      <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-500 mt-2 shrink-0" /> {r}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => ask("I'm a student or researcher. Tell me about studying and researching in Rwanda: universities, scholarships and how to apply.")}
                    className="mt-4 text-sm font-medium text-primary hover:underline flex items-center gap-1"
                  >
                    Learn about studying in Rwanda <ArrowUpRight className="h-4 w-4" />
                  </button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
