"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  FileText, HeartPulse, ShieldCheck, Wallet, Bus, Languages,
  type LucideIcon,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TRAVEL_ESSENTIALS, QUICK_FACTS } from "@/lib/rwanda-data";
import { useApp } from "@/lib/store";

const ICONS: Record<string, LucideIcon> = {
  FileText, HeartPulse, ShieldCheck, Wallet, Bus, Languages,
};

export function TravelEssentials() {
  const { setAiOpen, setAiSeed } = useApp();
  const ask = (q: string) => {
    setAiSeed(q);
    setAiOpen(true);
  };

  return (
    <section id="travel" className="py-20 sm:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-3 gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" /> Travel Essentials
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Everything you need, <span className="gradient-text">before you go</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Visas, health, safety, money, transport and culture: the practical intelligence for a
            smooth Rwandan journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Essentials accordion */}
          <div className="lg:col-span-2">
            <Card className="p-2 sm:p-4">
              <Accordion type="single" collapsible defaultValue="visa" className="w-full">
                {TRAVEL_ESSENTIALS.map((item, i) => {
                  const Icon = ICONS[item.icon] ?? FileText;
                  return (
                    <AccordionItem key={item.id} value={item.id} className="border-b last:border-0">
                      <AccordionTrigger className="hover:no-underline py-5 px-2 rounded-lg hover:bg-accent/50">
                        <div className="flex items-center gap-3 text-left">
                          <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <div className="font-semibold">{item.title}</div>
                            <div className="text-xs text-muted-foreground font-normal">{item.summary}</div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-2 pb-5">
                        <motion.ul
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-2 pl-12"
                        >
                          {item.details.map((d) => (
                            <li key={d} className="text-sm text-muted-foreground flex gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                              {d}
                            </li>
                          ))}
                          <li className="pt-1">
                            <button
                              onClick={() => ask(`Give me detailed, current advice about ${item.title} for travelling to Rwanda.`)}
                              className="text-xs font-medium text-primary hover:underline"
                            >
                              Ask Aiya for personalised help →
                            </button>
                          </li>
                        </motion.ul>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </Card>
          </div>

          {/* Quick facts panel */}
          <div>
            <Card className="p-6 h-full bg-gradient-to-b from-primary/5 to-transparent">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> Country quick facts
              </h3>
              <dl className="space-y-3 text-sm">
                {[
                  ["Official name", QUICK_FACTS.officialName],
                  ["Capital", QUICK_FACTS.capital],
                  ["Population", QUICK_FACTS.population],
                  ["Area", QUICK_FACTS.area],
                  ["Languages", QUICK_FACTS.languages],
                  ["Currency", QUICK_FACTS.currency],
                  ["Timezone", QUICK_FACTS.timezone],
                  ["Calling code", QUICK_FACTS.callingCode],
                  ["Electricity", QUICK_FACTS.electricity],
                  ["Independence", QUICK_FACTS.independence],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3 border-b border-border/60 pb-2 last:border-0">
                    <dt className="text-muted-foreground shrink-0">{k}</dt>
                    <dd className="font-medium text-right">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 pt-4 border-t border-border/60">
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">National motto</div>
                <div className="text-sm font-semibold italic">"{QUICK_FACTS.motto}"</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
