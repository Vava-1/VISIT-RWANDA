"use client";

import * as React from "react";
import {
  Menu, X, Sparkles, Sun, Moon, Plane, TrendingUp, GraduationCap,
  Palette, Trophy, Home as HomeIcon, ChevronDown, Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useApp } from "@/lib/store";
import { PERSONAS } from "@/lib/rwanda-data";
import { FlagRwanda } from "@/components/visit-rwanda/flag-rwanda";
import { useLang, LANGS } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { page: "discover" as const, key: "nav.discover" },
  { page: "experiences" as const, key: "nav.experiences" },
  { page: "cities" as const, key: "nav.cities" },
  { page: "invest" as const, key: "nav.invest" },
  { page: "travel" as const, key: "nav.travel" },
  { page: "health" as const, key: "nav.health" },
  { page: "live" as const, key: "nav.live" },
  { page: "connect" as const, key: "nav.connect" },
  { page: "planner" as const, key: "nav.plan" },
];

const PERSONA_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Plane: Plane,
  TrendingUp: TrendingUp,
  GraduationCap: GraduationCap,
  Palette: Palette,
  Trophy: Trophy,
  Home: HomeIcon,
};

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { persona, setPersona, setAiOpen, page, setPage } = useApp();
  const { lang, setLang, t } = useLang();

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentPersona = PERSONAS.find((p) => p.id === persona) ?? PERSONAS[0];
  const CurrentIcon = PERSONA_ICONS[currentPersona.icon] ?? Sparkles;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-[#00A1DE] text-white",
        scrolled ? "shadow-lg shadow-black/10" : "shadow-md shadow-black/5"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Logo */}
          <button
            onClick={() => { setPage("home"); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-3 shrink-0 group cursor-pointer"
            aria-label="Visit Rwanda home"
            title="Go to home page"
          >
            <div className="relative h-8 w-11 sm:h-10 sm:w-14 shrink-0">
              <div className="absolute inset-0 rounded-lg overflow-hidden shadow-lg ring-1 ring-white/20 group-hover:ring-white/40 transition-all">
                <FlagRwanda />
              </div>
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="leading-tight text-left">
              <div className="font-black tracking-tight text-sm sm:text-lg text-white flex items-baseline gap-1">
                <span>Visit</span>
                <span className="text-emerald-400">Rwanda</span>
              </div>
              <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/60 hidden md:block font-medium">
                Land of a Thousand Hills
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.page}
                onClick={() => { setPage(l.page); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  page === l.page
                    ? "bg-white/25 text-white"
                    : "text-white/90 hover:text-white hover:bg-white/15"
                )}
              >
                {t(l.key)}
              </button>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Persona switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" title={`I am a ${currentPersona.label}. Click to change persona.`} className="gap-1 h-9 px-2 sm:px-3 border-white/40 text-white bg-white/10 hover:bg-white/20 hover:text-white">
                  <CurrentIcon className="h-4 w-4 text-white shrink-0" />
                  <span className="hidden md:inline">{currentPersona.label}</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-80 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                  I am a…
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {PERSONAS.map((p) => {
                  const Icon = PERSONA_ICONS[p.icon] ?? Sparkles;
                  return (
                    <DropdownMenuItem
                      key={p.id}
                      onSelect={() => setPersona(p.id as any)}
                      className={cn("gap-2.5 py-2.5 cursor-pointer", persona === p.id && "bg-accent")}
                    >
                      <Icon className="h-4 w-4 text-primary shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{p.label}</span>
                        <span className="text-xs text-muted-foreground">{p.tagline}</span>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language switcher - icon only on mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" title="Change language (English / Kinyarwanda / French)" className="h-9 w-9 text-white hover:bg-white/15">
                  <Languages className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                {LANGS.map((l) => (
                  <DropdownMenuItem
                    key={l.id}
                    onSelect={() => setLang(l.id)}
                    className={cn("cursor-pointer", lang === l.id && "bg-accent")}
                  >
                    {l.native}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              title="Toggle light/dark theme"
              className="h-9 w-9 text-white hover:bg-white/15 hover:text-white"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-4.5 w-4.5" />
              ) : (
                <Moon className="h-4.5 w-4.5" />
              )}
            </Button>

            {/* AI Concierge - icon only on small screens, full text on sm+ */}
            <Button
              size="sm"
              title="Ask RWANDA - your AI concierge for any question about Rwanda"
              className="gap-1 h-9 px-2.5 shadow-md bg-[#FAD201] text-[#20603D] hover:bg-[#FAD201]/90 hover:text-[#20603D] shrink-0"
              onClick={() => setAiOpen(true)}
              aria-label="Ask RWANDA AI concierge"
            >
              <Sparkles className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">{t("nav.askRwanda")}</span>
            </Button>

            {/* Mobile menu - clearly visible with label on all devices */}
            <Button
              variant="ghost"
              title="Open navigation menu"
              className="lg:hidden text-white hover:bg-white/20 hover:text-white bg-white/10 border-2 border-white/40 rounded-lg shrink-0 flex items-center gap-2 px-3 h-11"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open navigation menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="text-sm font-bold">{open ? t("nav.close") : t("nav.menu")}</span>
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="lg:hidden pb-4 pt-2 animate-fade-up border-t border-white/20 mt-1">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-semibold px-3 pb-2 pt-1">
              {t("nav.navigation")}
            </div>
            <div className="grid gap-1">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.page}
                  onClick={() => { setPage(l.page); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={cn(
                    "px-4 py-3 text-base font-medium rounded-lg text-left flex items-center justify-between",
                    page === l.page
                      ? "bg-white/25 text-white"
                      : "text-white/90 hover:text-white hover:bg-white/15"
                  )}
                >
                  {t(l.key)}
                  <ChevronDown className="h-4 w-4 -rotate-90 opacity-50" />
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
      {/* Flag accent: yellow + green bands at the bottom edge of the blue bar,
          echoing the lower half of the Rwandan flag. */}
      <div className="h-[3px] bg-[#FAD201]" />
      <div className="h-[3px] bg-[#20603D]" />
    </header>
  );
}
