"use client";

import * as React from "react";
import { Navbar } from "@/components/visit-rwanda/navbar";
import { Hero } from "@/components/visit-rwanda/hero";
import { PersonaZone } from "@/components/visit-rwanda/persona-zone";
import { Destinations } from "@/components/visit-rwanda/destinations";
import { Experiences } from "@/components/visit-rwanda/experiences";
import { Invest } from "@/components/visit-rwanda/invest";
import { TravelEssentials } from "@/components/visit-rwanda/travel-essentials";
import { RealtimeHub } from "@/components/visit-rwanda/realtime-hub";
import { LiveSection } from "@/components/visit-rwanda/live-section";
import { ItineraryPlanner } from "@/components/visit-rwanda/itinerary-planner";
import { Footer } from "@/components/visit-rwanda/footer";
import { AIConcierge } from "@/components/visit-rwanda/ai-concierge";
import { FeedbackDialog } from "@/components/visit-rwanda/feedback-dialog";
import { useApp } from "@/lib/store";

export default function Home() {
  const { sessionId, persona } = useApp();

  // Fire an anonymous page-view event (best-effort, never blocks UX).
  React.useEffect(() => {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "view", target: "/", sessionId, meta: { persona } }),
      keepalive: true,
    }).catch(() => {});
  }, [sessionId, persona]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PersonaZone />
        <Destinations />
        <Experiences />
        <Invest />
        <TravelEssentials />
        <section id="planner">
          <ItineraryPlanner />
        </section>
        <RealtimeHub />
        <LiveSection />
      </main>
      <Footer />
      <AIConcierge />
      <FeedbackDialog />
    </div>
  );
}
