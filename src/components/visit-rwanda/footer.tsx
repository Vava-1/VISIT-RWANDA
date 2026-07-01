"use client";

import * as React from "react";
import {
  Sparkles, LifeBuoy, ShieldCheck, Globe2, Mail, Phone, MapPin,
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
    title: "Country",
    links: [
      { label: "Quick Facts", page: "travel" as const },
      { label: "Government Portal", href: "https://www.gov.rw" },
      { label: "Rwanda Development Board", href: "https://rdb.rw" },
      { label: "Visit Rwanda Official", href: "https://www.visitrwanda.com" },
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
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Safe with your data</span>
            <span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-amber-400" /> Personalised for you</span>
            <span className="flex items-center gap-1.5"><Globe2 className="h-4 w-4 text-sky-400" /> Always current</span>
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
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative h-10 w-14 overflow-hidden ring-1 ring-white/20">
                <FlagRwanda />
              </div>
              <div>
                <div className="font-black text-lg text-emerald-400">Visit Rwanda</div>
                <div className="text-xs text-background/60 uppercase tracking-wide">Land of a Thousand Hills</div>
              </div>
            </div>
            <p className="text-sm text-background/70 max-w-sm leading-relaxed">
              The intelligent digital gateway to the Republic of Rwanda, uniting tourism,
              investment, culture, sport and learning in one trustworthy, intelligent platform.
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
        <div className="mt-10 pt-6 border-t border-white/10 grid sm:grid-cols-3 gap-4 text-sm text-background/70">
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-amber-400" /> KG 9 Ave, Kigali, Rwanda</span>
          <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-amber-400" /> +250 788 300 000</span>
          <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-amber-400" /> info@visitrwanda.rw</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/60">
          <div>
            © {new Date().getFullYear()} Visit Rwanda Platform · {QUICK_FACTS.officialName}
          </div>
          <div className="flex items-center gap-4">
            <span>"{QUICK_FACTS.motto}"</span>
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
