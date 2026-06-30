"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu, X, Sparkles, Sun, Moon, Plane, TrendingUp, GraduationCap,
  Palette, Trophy, Home as HomeIcon, ChevronDown,
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
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#discover", label: "Discover" },
  { href: "#experiences", label: "Experiences" },
  { href: "#invest", label: "Invest" },
  { href: "#travel", label: "Travel" },
  { href: "#live", label: "Live" },
  { href: "#connect", label: "Connect" },
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
  const { persona, setPersona, setAiOpen } = useApp();

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
          <Link href="#top" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative h-9 w-12 overflow-hidden shadow-md ring-1 ring-black/5">
              <FlagRwanda />
            </div>
            <div className="leading-tight">
              <div className="font-black tracking-tight text-base sm:text-lg text-white">
                Visit <span className="text-emerald-400">Rwanda</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/70 hidden sm:block">
                Land of a Thousand Hills
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/15 rounded-lg transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Persona switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5 h-9 border-white/40 text-white bg-white/10 hover:bg-white/20 hover:text-white">
                  <CurrentIcon className="h-4 w-4 text-white" />
                  <span className="hidden sm:inline">{currentPersona.label}</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-80" />
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

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
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

            {/* AI Concierge */}
            <Button
              size="sm"
              className="gap-1.5 h-9 shadow-md bg-[#FAD201] text-[#20603D] hover:bg-[#FAD201]/90 hover:text-[#20603D]"
              onClick={() => setAiOpen(true)}
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Ask RWANDA</span>
            </Button>

            {/* Mobile menu */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 lg:hidden text-white hover:bg-white/15 hover:text-white"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="lg:hidden pb-4 animate-fade-up">
            <div className="grid gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium rounded-lg text-white/90 hover:text-white hover:bg-white/15"
                >
                  {l.label}
                </Link>
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
