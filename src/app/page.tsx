"use client";

import * as React from "react";
import { Navbar } from "@/components/visit-rwanda/navbar";
import { Hero } from "@/components/visit-rwanda/hero";
import { PersonaZone } from "@/components/visit-rwanda/persona-zone";
import { PersonaHub } from "@/components/visit-rwanda/persona-hub";
import { Destinations } from "@/components/visit-rwanda/destinations";
import { Experiences } from "@/components/visit-rwanda/experiences";
import { CitiesTransport } from "@/components/visit-rwanda/cities-transport";
import { Invest } from "@/components/visit-rwanda/invest";
import { TravelEssentials } from "@/components/visit-rwanda/travel-essentials";
import { CurrencyConverter } from "@/components/visit-rwanda/currency-converter";
import { HealthCommunity } from "@/components/visit-rwanda/health-community";
import { RealtimeHub } from "@/components/visit-rwanda/realtime-hub";
import { LiveSection } from "@/components/visit-rwanda/live-section";
import { ItineraryPlanner } from "@/components/visit-rwanda/itinerary-planner";
import { Footer } from "@/components/visit-rwanda/footer";
import { AIConcierge } from "@/components/visit-rwanda/ai-concierge";
import { FeedbackDialog } from "@/components/visit-rwanda/feedback-dialog";
import { HotelBookingDialog } from "@/components/visit-rwanda/hotel-booking-dialog";
import { EmergencySOS } from "@/components/visit-rwanda/emergency-sos";
import { EntryGate } from "@/components/visit-rwanda/entry-gate";
import { useApp } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Section IDs that anchor within the page (for the PersonaHub on the home page).
// Each nav page maps to a single rendered component.
function PageContent() {
  const { page, setPage } = useApp();

  // Home page: hero + persona zone + persona hub (the personalised directory)
  if (page === "home") {
    return (
      <>
        <Hero />
        <PersonaZone />
        <PersonaHub />
      </>
    );
  }

  // Sub-pages: a slim header with back button, then the section content
  const pageMeta: Record<string, { title: string; subtitle: string }> = {
    discover: { title: "Discover Rwanda", subtitle: "Every place worth a thousand stories" },
    experiences: { title: "Signature Experiences", subtitle: "Moments that stay with you" },
    cities: { title: "Cities & Transport", subtitle: "Every city, every way to get there" },
    invest: { title: "Invest in Rwanda", subtitle: "Africa's rising star for investment" },
    travel: { title: "Travel Essentials", subtitle: "Everything you need before you go" },
    health: { title: "Health & Community", subtitle: "Care for visitors, heart of the nation" },
    live: { title: "Culture, Sport & Learning", subtitle: "The living pulse of Rwanda" },
    connect: { title: "Rwanda, Live", subtitle: "Always current, always Rwanda" },
    planner: { title: "AI Itinerary Planner", subtitle: "Build your trip in seconds" },
  };

  const meta = pageMeta[page] ?? pageMeta.discover;

  return (
    <div className="pt-16">
      {/* Page header */}
      <div className="bg-gradient-to-b from-[#00A1DE]/10 to-transparent border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-3 gap-1.5 text-muted-foreground hover:text-foreground"
            onClick={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Button>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {meta.title}
          </h1>
          <p className="mt-1 text-muted-foreground">{meta.subtitle}</p>
        </div>
      </div>

      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {page === "discover" && <Destinations />}
          {page === "experiences" && <Experiences />}
          {page === "cities" && <CitiesTransport />}
          {page === "invest" && <Invest />}
          {page === "travel" && (
            <>
              <TravelEssentials />
              <div className="py-8 bg-muted/30">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <CurrencyConverter />
                </div>
              </div>
            </>
          )}
          {page === "health" && <HealthCommunity />}
          {page === "live" && <LiveSection />}
          {page === "connect" && <RealtimeHub />}
          {page === "planner" && <ItineraryPlanner />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const { sessionId, persona, hasChosenPersona } = useApp();

  // Fire an anonymous page-view event (best-effort, never blocks UX).
  React.useEffect(() => {
    if (!hasChosenPersona) return;
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "view", target: "/", sessionId, meta: { persona } }),
      keepalive: true,
    }).catch(() => {});
  }, [sessionId, persona, hasChosenPersona]);

  // Show the entry gate until the user has chosen a persona
  if (!hasChosenPersona) {
    return <EntryGate />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <PageContent />
      </main>
      <Footer />
      <AIConcierge />
      <FeedbackDialog />
      <HotelBookingDialog />
      <EmergencySOS />
    </div>
  );
}
