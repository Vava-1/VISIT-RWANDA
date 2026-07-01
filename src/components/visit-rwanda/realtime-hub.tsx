"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Newspaper, CalendarDays, ShieldAlert, RefreshCw, ExternalLink,
  Radio, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FEATURED_EVENTS } from "@/lib/rwanda-data";

type Result = {
  title: string; url: string; snippet: string; source: string; date: string;
};

const TABS = [
  { id: "news", label: "Latest News", icon: Newspaper, query: "news" },
  { id: "tourism", label: "Tourism", icon: Radio, query: "tourism" },
  { id: "business", label: "Business", icon: CalendarDays, query: "business" },
  { id: "travel", label: "Travel Advisories", icon: ShieldAlert, query: "travel" },
] as const;

function ResultCard({ r }: { r: Result }) {
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl border border-border bg-card p-4 hover:shadow-md hover:border-primary/40 transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
          <span className="truncate font-medium text-primary">{r.source || "source"}</span>
          {r.date && (
            <span className="flex items-center gap-1 shrink-0">
              · <Clock className="h-3 w-3" /> {r.date.slice(0, 10)}
            </span>
          )}
        </div>
        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary shrink-0" />
      </div>
      <h4 className="font-semibold mt-1.5 leading-snug group-hover:text-primary transition-colors line-clamp-2">
        {r.title}
      </h4>
      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{r.snippet}</p>
    </a>
  );
}

export function RealtimeHub() {
  const [tab, setTab] = React.useState<string>("news");
  const [results, setResults] = React.useState<Result[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = React.useState<string>("");

  const load = React.useCallback(async (topic: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/search?topic=${topic}&num=8`, { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.results)) {
        setResults(data.results);
        setUpdatedAt(new Date(data.generatedAt || Date.now()).toLocaleTimeString());
      } else {
        setError(data.error || "Could not load live data.");
        setResults([]);
      }
    } catch {
      setError("Live search is briefly unavailable.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load(tab);
  }, [tab, load]);

  return (
    <section id="connect" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <Badge variant="outline" className="mb-3 gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Live Hub
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Rwanda, <span className="gradient-text">live</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Always current: news, tourism updates, business intelligence and official travel
              advisories, refreshed on demand from across the web.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {updatedAt && !loading && (
              <span className="text-xs text-muted-foreground">Updated {updatedAt}</span>
            )}
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => load(tab)}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            {TABS.map((t) => (
              <TabsTrigger key={t.id} value={t.id} className="gap-1.5 py-2.5">
                <t.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{t.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={tab} className="mt-6">
            {error ? (
              <Card className="p-8 text-center text-muted-foreground">
                <ShieldAlert className="h-8 w-8 mx-auto mb-3 text-amber-500" />
                <p>{error}</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => load(tab)}>
                  Try again
                </Button>
              </Card>
            ) : loading ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="p-4">
                    <Skeleton className="h-3 w-32 mb-2" />
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </Card>
                ))}
              </div>
            ) : results.length === 0 ? (
              <Card className="p-8 text-center text-muted-foreground">No results right now.</Card>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {results.map((r, i) => (
                  <motion.div
                    key={r.url + i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <ResultCard r={r} />
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Featured events */}
        <div className="mt-14">
          <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" /> Featured annual events
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED_EVENTS.map((e) => (
              <Card key={e.name} className="p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">{e.month}</Badge>
                </div>
                <h4 className="font-semibold leading-tight">{e.name}</h4>
                <div className="text-xs text-muted-foreground mt-1">{e.place}</div>
                <p className="text-sm text-muted-foreground mt-2">{e.note}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
