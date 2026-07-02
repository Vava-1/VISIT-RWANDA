"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Siren, Phone, MapPin, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HEALTH_FACILITIES } from "@/lib/rwanda-data";

export function EmergencySOS() {
  const [open, setOpen] = React.useState(false);
  const [showFab, setShowFab] = React.useState(false);

  // Show the FAB after scrolling a bit (don't clutter the hero)
  React.useEffect(() => {
    const onScroll = () => setShowFab(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const emergencies = [
    { label: "Police", number: "112", desc: "General emergencies, crime, security" },
    { label: "Ambulance / Medical", number: "114", desc: "Medical emergencies" },
    { label: "Traffic Police", number: "113", desc: "Road accidents and traffic" },
  ];

  const nearestHospitals = HEALTH_FACILITIES.filter(
    (f) => f.type === "Hospital" && f.emergency
  ).slice(0, 4);

  return (
    <>
      {/* Floating SOS button */}
      <AnimatePresence>
        {showFab && !open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 left-5 z-40 h-12 px-4 rounded-full bg-red-600 text-white shadow-2xl flex items-center gap-2 font-bold text-sm hover:bg-red-700 transition-colors"
            aria-label="Emergency SOS"
          >
            <Siren className="h-5 w-5" />
            <span className="hidden sm:inline">SOS</span>
            <span className="absolute inset-0 rounded-full ring-2 ring-red-400/50 animate-ping" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* SOS panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-[94vw] max-w-md bg-card rounded-2xl shadow-2xl border border-red-200 dark:border-red-900 overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-border bg-red-600 text-white">
                <div className="flex items-center gap-2">
                  <Siren className="h-5 w-5" />
                  <h3 className="font-bold">Emergency SOS</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={() => setOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-4 overflow-y-auto space-y-4">
                <div className="flex items-start gap-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 p-3 text-sm text-amber-800 dark:text-amber-200">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>Tap a number to call. If you are in immediate danger, call <strong>112</strong> now.</span>
                </div>

                {/* Emergency numbers */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Emergency numbers</h4>
                  {emergencies.map((e) => (
                    <a
                      key={e.number}
                      href={`tel:${e.number}`}
                      className="flex items-center gap-3 rounded-xl border border-border p-3 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-lg">{e.number}</div>
                        <div className="text-xs text-muted-foreground">{e.label} · {e.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Nearest hospitals */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Key hospitals with emergency care</h4>
                  {nearestHospitals.map((h) => (
                    <a
                      key={h.id}
                      href={h.contact ? `tel:${h.contact.replace(/[^0-9+]/g, "")}` : "#"}
                      className="flex items-center gap-3 rounded-xl border border-border p-3 hover:border-primary hover:bg-accent transition-colors"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">{h.name}</div>
                        <div className="text-xs text-muted-foreground">{h.location}</div>
                        {h.emergency && <div className="text-xs text-red-600 dark:text-red-400 mt-0.5">{h.emergency}</div>}
                      </div>
                    </a>
                  ))}
                </div>

                <p className="text-[11px] text-muted-foreground text-center pt-2">
                  Numbers are for Rwanda. If travelling, ensure your phone has a local SIM or roaming.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
