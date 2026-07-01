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

interface AppState {
  persona: PersonaId;
  setPersona: (p: PersonaId) => void;
  sessionId: string;
  aiOpen: boolean;
  setAiOpen: (open: boolean) => void;
  aiSeed: string | null;
  setAiSeed: (q: string | null) => void;
  feedbackOpen: boolean;
  setFeedbackOpen: (open: boolean) => void;
}

function genSessionId() {
  return "rw-" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export const useApp = create<AppState>()(
  persist(
    (set) => ({
      persona: "tourist",
      setPersona: (persona) => set({ persona }),
      sessionId: typeof window !== "undefined" ? genSessionId() : "rw-ssr",
      aiOpen: false,
      setAiOpen: (aiOpen) => set({ aiOpen }),
      aiSeed: null,
      setAiSeed: (aiSeed) => set({ aiSeed }),
      feedbackOpen: false,
      setFeedbackOpen: (feedbackOpen) => set({ feedbackOpen }),
    }),
    {
      name: "visit-rwanda-store",
      partialize: (s) => ({ persona: s.persona, sessionId: s.sessionId }),
    }
  )
);
