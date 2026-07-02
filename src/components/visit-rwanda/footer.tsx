"use client";

import * as React from "react";
import {
  Sparkles, LifeBuoy, ShieldCheck, Globe2, Mail, MapPin,
  Facebook, Twitter, Instagram, Youtube, Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/lib/store";
import { QUICK_FACTS } from "@/lib/rwanda-data";
import { FlagRwanda } from "@/components/visit-rwanda/flag-rwanda";

const LINKS = [
  {
    title: "Discover",
    links: [
      { label: "Destinations", page: "discover" as const },
      { label: "Experiences", page: "experiences" as const },
      { label: "Live Hub", page: "connect" as const },
      { label: "Culture & Sport", page: "live" as const },
    ],
  },
  {
    title: "Plan",
    links: [
      { label: "Visa & Entry", page: "travel" as const },
      { label: "Health & Safety", page: "health" as const },
      { label: "Hospitals & Community", page: "health" as const },
      { label: "Itinerary Planner", page: "planner" as const },
    ],
  },
  {
    title: "Opportunity",
    links: [
      { label: "Invest in Rwanda", page: "invest" as const },
      { label: "Kigali Financial Centre", page: "invest" as const },
      { label: "Business News", page: "connect" as const },
      { label: "Education & Research", page: "live" as const },
    ],
  },
  {
    title: "Verified official sources",
    links: [
      { label: "Government Portal", href: "https://www.gov.rw" },
      { label: "Rwanda Development Board (RDB)", href: "https://rdb.rw" },
      { label: "Visit Rwanda (official)", href: "https://www.visitrwanda.com" },
      { label: "Irembo (visas & services)", href: "https://irembo.gov.rw" },
      { label: "NISR (statistics)", href: "https://www.statistics.gov.rw" },
    ],
  },
];

const SOCIALS = [
  { icon: Twitter, href: "https://twitter.com/VisitRwandaNow", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/visitrwanda.now", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export function Footer() {
  const { setAiOpen, setFeedbackOpen } = useApp();
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  return (
    <footer className="mt-auto bg-foreground text-background">
      <div className="h-1 rwanda-flag-bar" />

      {/* Trust banner */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-background/80">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Independent project</span>
            <span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-amber-400" /> AI-assisted</span>
            <span className="flex items-center gap-1.5"><Globe2 className="h-4 w-4 text-sky-400" /> Verify on official sources</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent border-white/20 text-background hover:bg-white/10 hover:text-background gap-1.5"
            onClick={() => setFeedbackOpen(true)}
          >
            <LifeBuoy className="h-4 w-4" /> Report an issue
          </Button>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand + newsletter */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-11 w-14 shrink-0">
                <div className="absolute inset-0 rounded-lg overflow-hidden shadow-lg ring-1 ring-white/20">
                  <FlagRwanda />
                </div>
              </div>
              <div className="leading-tight">
                <div className="font-black text-lg flex items-baseline gap-1">
                  <span className="text-background">Visit</span>
                  <span className="text-emerald-400">Rwanda</span>
                </div>
                <div className="text-[10px] text-background/60 uppercase tracking-[0.2em] font-medium">Land of a Thousand Hills</div>
              </div>
            </div>
            <p className="text-sm text-background/70 max-w-sm leading-relaxed">
              An independent digital guide uniting tourism, investment, culture, sport and
              learning for Rwanda. Not affiliated with the Government of Rwanda.
            </p>

            <div className="mt-5">
              <Label2 text="Stay in the loop" />
              <form
                onSubmit={(e) => { e.preventDefault(); if (email.trim()) { setSubscribed(true); setEmail(""); } }}
                className="flex gap-2 mt-2"
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="bg-white/5 border-white/15 text-background placeholder:text-background/40"
                />
                <Button type="submit" size="sm" className="shrink-0">Subscribe</Button>
              </form>
              {subscribed && (
                <p className="text-xs text-emerald-400 mt-2">Murakoze! You're on the list. 🇷🇼</p>
              )}
            </div>

            <div className="mt-5 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {LINKS.map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-sm mb-3 text-background">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((l: any) => (
                    <li key={l.label}>
                      {"page" in l ? (
                        <button
                          onClick={() => { useApp.getState().setPage(l.page); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="text-sm text-background/65 hover:text-background transition-colors text-left"
                        >
                          {l.label}
                        </button>
                      ) : (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-background/65 hover:text-background transition-colors"
                        >
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-10 pt-6 border-t border-white/10 grid sm:grid-cols-2 gap-4 text-sm text-background/70">
          <span className="flex items-start gap-2"><MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" /> An independent project. For official Rwanda services, visit <a href="https://irembo.gov.rw" className="underline" target="_blank" rel="noopener noreferrer">irembo.gov.rw</a></span>
          <span className="flex items-start gap-2"><Mail className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" /> This is a demo project. No official contact details are provided.</span>
        </div>
      </div>

      {/* Disclaimer banner */}
      <div className="border-t border-amber-500/30 bg-amber-500/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 text-center text-[11px] text-amber-300/90 leading-relaxed">
          This is an <strong>independent, unofficial project</strong>, not affiliated with or endorsed by the Government of Rwanda, RDB, or any official body. Always verify official information (visas, permits, fees) at the official sources below.
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/60">
          <div>
            © {new Date().getFullYear()} An independent project · Not affiliated with the Republic of Rwanda
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setAiOpen(true)} className="hover:text-background flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Ask RWANDA
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Label2({ text }: { text: string }) {
  return <span className="text-xs uppercase tracking-wide text-background/60 font-semibold">{text}</span>;
}
