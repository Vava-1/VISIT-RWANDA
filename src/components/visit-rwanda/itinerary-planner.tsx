"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarRange, Sparkles, Loader2, Download, Map } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/lib/store";
import { IMAGES } from "@/lib/rwanda-data";

export function ItineraryPlanner() {
  const { persona, sessionId } = useApp();
  const [days, setDays] = React.useState("5");
  const [interests, setInterests] = React.useState("wildlife, culture, nature");
  const [budget, setBudget] = React.useState("mid-range");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/ai/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          days: parseInt(days) || 5,
          interests,
          budget,
          persona,
          sessionId,
        }),
      });
      const data = await res.json();
      if (data.success && data.itinerary) {
        setResult(data.itinerary);
      } else {
        setError(data.error || "Could not generate itinerary. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={IMAGES.kivu} alt="" className="h-full w-full object-cover opacity-15" />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3 gap-1.5">
            <CalendarRange className="h-3.5 w-3.5" /> AI Itinerary Planner
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Build your trip in <span className="gradient-text">seconds</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Tell RWANDA how long you have and what you love, and get a realistic, day by day Rwandan
            itinerary with travel times, stays and practical tips.
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div className="space-y-1.5">
                <Label htmlFor="days">Duration</Label>
                <Select value={days} onValueChange={setDays}>
                  <SelectTrigger id="days"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["3", "5", "7", "10", "14"].map((d) => (
                      <SelectItem key={d} value={d}>{d} days</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="budget">Budget</Label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger id="budget"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget / Backpacker</SelectItem>
                    <SelectItem value="mid-range">Mid-range</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="interests">Interests</Label>
                <Input
                  id="interests"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="e.g. gorillas, coffee, hiking"
                />
              </div>
            </div>

            <Button
              size="lg"
              className="w-full gap-2"
              onClick={generate}
              disabled={loading}
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Crafting your itinerary…</>
              ) : (
                <><Sparkles className="h-4 w-4" /> Generate my itinerary</>
              )}
            </Button>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 rounded-xl bg-destructive/10 text-destructive text-sm p-3"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-2xl border border-border bg-muted/30 p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Map className="h-5 w-5 text-primary" />
                      <h3 className="font-bold">Your {days}-day Rwanda journey</h3>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => {
                        const blob = new Blob([result], { type: "text/markdown" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `rwanda-itinerary-${days}days.md`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                    >
                      <Download className="h-3.5 w-3.5" /> Save
                    </Button>
                  </div>
                  <div className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&_h2]:font-bold [&_h2]:text-base [&_h2]:mt-5 [&_h2]:mb-2 [&_strong]:font-semibold [&_ul]:my-1.5 [&_li]:my-0.5 max-h-[480px] overflow-y-auto scroll-elegant pr-2">
                    <ReactMarkdown>{result}</ReactMarkdown>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
