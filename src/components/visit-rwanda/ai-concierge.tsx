"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, X, Send, Bot, User, Loader2, Trash2, MessageSquare,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useApp } from "@/lib/store";
import { AI_SUGGESTIONS, PERSONAS } from "@/lib/rwanda-data";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

export function AIConcierge() {
  const { aiOpen, setAiOpen, aiSeed, setAiSeed, persona, sessionId } = useApp();
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const personaLabel = PERSONAS.find((p) => p.id === persona)?.label ?? "visitor";

  // Seed: when aiSeed is set and panel opens, auto-send it once.
  const sentSeedRef = React.useRef<string | null>(null);
  React.useEffect(() => {
    if (aiOpen && aiSeed && sentSeedRef.current !== aiSeed) {
      sentSeedRef.current = aiSeed;
      send(aiSeed);
      setAiSeed(null);
    }
  }, [aiOpen, aiSeed]);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg: Msg = { role: "user", content: trimmed };
    const history = messages.slice(-6);
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, persona, sessionId, history }),
      });
      const data = await res.json();
      const reply =
        data.reply ||
        "I'm sorry, I couldn't reach the concierge right now. Please try again in a moment.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting. Please check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    sentSeedRef.current = null;
  };

  return (
    <>
      {/* Floating action button */}
      <AnimatePresence>
        {!aiOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setAiOpen(true)}
            className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center hover:scale-105 transition-transform group"
            aria-label="Open AI concierge"
          >
            <Sparkles className="h-6 w-6" />
            <span className="absolute inset-0 rounded-full ring-2 ring-primary/30 animate-ping" />
            <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-foreground text-background px-3 py-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
              Ask Aiya anything
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {aiOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAiOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[440px] bg-card border-l border-border shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold leading-tight">Aiya</div>
                    <div className="text-xs opacity-90">Rwanda AI Concierge · {personaLabel}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-white/20"
                    onClick={clearChat}
                    aria-label="Clear chat"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-white/20"
                    onClick={() => setAiOpen(false)}
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto scroll-elegant p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-6">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-8 w-8" />
                    </div>
                    <h3 className="font-bold text-lg">Muraho! I'm Aiya 🇷🇼</h3>
                    <p className="text-sm text-muted-foreground mt-1.5 max-w-xs mx-auto">
                      Your intelligent guide to Rwanda: tourism, investment, culture, sport and
                      everything in between. How can I help?
                    </p>
                    <div className="mt-5 grid gap-2 text-left">
                      {AI_SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className="text-sm text-left rounded-xl border border-border bg-muted/40 hover:bg-accent p-3 transition-colors flex items-start gap-2"
                        >
                          <MessageSquare className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex gap-2.5",
                      m.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                        m.role === "user"
                          ? "bg-accent text-accent-foreground"
                          : "bg-primary text-primary-foreground"
                      )}
                    >
                      {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2.5 max-w-[85%] text-sm",
                        m.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted rounded-tl-sm"
                      )}
                    >
                      {m.role === "assistant" ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_ul]:my-1.5 [&_ol]:my-1.5 [&_li]:my-0.5 [&_strong]:font-semibold [&_a]:text-primary [&_a]:underline">
                          <ReactMarkdown>{m.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border bg-card">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(input);
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Rwanda…"
                    className="flex-1 h-11"
                    disabled={loading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-11 w-11 shrink-0"
                    disabled={loading || !input.trim()}
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>
                <p className="text-[10px] text-muted-foreground text-center mt-2">
                  Aiya can make mistakes. Verify critical info via official sources.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
