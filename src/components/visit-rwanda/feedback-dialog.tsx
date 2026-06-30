"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LifeBuoy, X, Send, Loader2, CheckCircle2, MessageSquareWarning } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useApp } from "@/lib/store";

export function FeedbackDialog() {
  const { feedbackOpen, setFeedbackOpen, sessionId } = useApp();
  const [category, setCategory] = React.useState("suggest");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const submit = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          message,
          url: typeof window !== "undefined" ? window.location.pathname : "/",
          sessionId,
        }),
      });
      setDone(true);
      setMessage("");
      setTimeout(() => {
        setDone(false);
        setFeedbackOpen(false);
      }, 2200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {feedbackOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFeedbackOpen(false)}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-[92vw] max-w-md bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <LifeBuoy className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="font-bold leading-tight">Help us self-heal</h3>
                  <p className="text-xs text-muted-foreground">Spotted something? Tell the team.</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setFeedbackOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {done ? (
              <div className="p-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
                <h4 className="font-bold">Thank you!</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Your input helps keep Visit Rwanda accurate and trustworthy.
                </p>
              </div>
            ) : (
              <div className="p-5 space-y-4">
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="report-issue">Report an issue</SelectItem>
                      <SelectItem value="data-correction">Data correction</SelectItem>
                      <SelectItem value="suggest">Suggest a feature</SelectItem>
                      <SelectItem value="praise">Share praise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="fb-msg">Message</Label>
                  <Textarea
                    id="fb-msg"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe what you saw or what you'd love to see…"
                    rows={4}
                  />
                </div>
                <Button className="w-full gap-2" onClick={submit} disabled={loading || !message.trim()}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {loading ? "Sending…" : "Send feedback"}
                </Button>
                <p className="text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1.5">
                  <MessageSquareWarning className="h-3.5 w-3.5" />
                  We never store personal data, only your anonymous message.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
