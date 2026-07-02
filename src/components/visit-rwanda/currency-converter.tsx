"use client";

import * as React from "react";
import { RefreshCw, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { DATA_SOURCES } from "@/lib/data-sources";

type Rates = Record<string, number>;

const CURRENCIES = [
  { code: "RWF", name: "Rwandan Franc", flag: "🇷🇼" },
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "KES", name: "Kenyan Shilling", flag: "🇰🇪" },
  { code: "UGX", name: "Ugandan Shilling", flag: "🇺🇬" },
];

export function CurrencyConverter() {
  const [rates, setRates] = React.useState<Rates | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [updatedAt, setUpdatedAt] = React.useState<string>("");
  const [from, setFrom] = React.useState("USD");
  const [to, setTo] = React.useState("RWF");
  const [amount, setAmount] = React.useState("100");
  const [error, setError] = React.useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/USD", { cache: "no-store" });
      const data = await res.json();
      if (data && data.rates) {
        setRates(data.rates);
        setUpdatedAt(new Date(data.time_last_update_unix * 1000).toLocaleString());
      } else {
        setError("Could not load rates.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    load();
  }, []);

  const convert = (amt: number, fromCode: string, toCode: string): number => {
    if (!rates) return 0;
    // rates are relative to USD. Convert from->USD->to.
    const fromRate = rates[fromCode] || 1;
    const toRate = rates[toCode] || 1;
    const usd = amt / fromRate;
    return usd * toRate;
  };

  const result = rates ? convert(parseFloat(amount) || 0, from, to) : 0;

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" /> Live Currency Converter
          </h3>
          <button
            onClick={load}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            disabled={loading}
          >
            <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>

        {error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="space-y-1.5">
                <Label className="text-xs">From</Label>
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">To</Label>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5 mb-4">
              <Label className="text-xs">Amount</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-10"
              />
            </div>

            <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 text-center">
              <div className="text-2xl font-black text-primary">
                {result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {to}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {amount} {from} =
              </div>
            </div>

            <div className="mt-3 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Live rates
              </span>
              {" · "}Updated {updatedAt}
              {" · "}Source: {DATA_SOURCES.currency.source}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
