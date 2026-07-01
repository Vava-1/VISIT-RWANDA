"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type PersonaId =
  | "tourist"
  | "investor"
  | "student"
  | "artist"
  | "athlete"
  | "expat";

export type PageId =
  | "home"
  | "discover"
  | "experiences"
  | "cities"
  | "invest"
  | "travel"
  | "health"
  | "live"
  | "connect"
  | "planner";

interface AppState {
  persona: PersonaId;
  setPersona: (p: PersonaId) => void;
  page: PageId;
  setPage: (p: PageId) => void;
  sessionId: string;
  aiOpen: boolean;
  setAiOpen: (open: boolean) => void;
  aiSeed: string | null;
  setAiSeed: (q: string | null) => void;
  feedbackOpen: boolean;
  setFeedbackOpen: (open: boolean) => void;
  bookingOpen: boolean;
  setBookingOpen: (open: boolean) => void;
  bookingHotel: string | null;
  setBookingHotel: (hotel: string | null) => void;
}

function genSessionId() {
  return "rw-" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export const useApp = create<AppState>()(
  persist(
    (set) => ({
      persona: "tourist",
      setPersona: (persona) => set({ persona }),
      page: "home",
      setPage: (page) => set({ page }),
      sessionId: typeof window !== "undefined" ? genSessionId() : "rw-ssr",
      aiOpen: false,
      setAiOpen: (aiOpen) => set({ aiOpen }),
      aiSeed: null,
      setAiSeed: (aiSeed) => set({ aiSeed }),
      feedbackOpen: false,
      setFeedbackOpen: (feedbackOpen) => set({ feedbackOpen }),
      bookingOpen: false,
      setBookingOpen: (bookingOpen) => set({ bookingOpen }),
      bookingHotel: null,
      setBookingHotel: (bookingHotel) => set({ bookingHotel }),
    }),
    {
      name: "visit-rwanda-store",
      partialize: (s) => ({ persona: s.persona, sessionId: s.sessionId }),
    }
  )
);
