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
  Plane, TrendingUp, GraduationCap, Palette, Trophy, HomeIcon,
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
  const CurrentIcon = PERSONA_ICONS[currentPersona.icon];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-border/60 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="h-1 rwanda-flag-bar" />
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Logo */}
          <Link href="#top" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative h-9 w-9 rounded-xl overflow-hidden shadow-md ring-1 ring-black/5">
              <div className="absolute inset-0 rwanda-flag-bar" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-black text-sm drop-shadow">R</span>
              </div>
            </div>
            <div className="leading-tight">
              <div className="font-black tracking-tight text-base sm:text-lg">
                Visit<span className="gradient-text"> Rwanda</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground hidden sm:block">
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
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent/60 rounded-lg transition-colors"
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
                <Button variant="outline" size="sm" className="gap-1.5 h-9">
                  <CurrentIcon className="h-4 w-4 text-primary" />
                  <span className="hidden sm:inline">{currentPersona.label}</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                  I am a…
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {PERSONAS.map((p) => {
                  const Icon = PERSONA_ICONS[p.icon];
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
              className="h-9 w-9"
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
              className="gap-1.5 h-9 shadow-md"
              onClick={() => setAiOpen(true)}
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Ask Aiya</span>
            </Button>

            {/* Mobile menu */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 lg:hidden"
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
                  className="px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-accent"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
