import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { LangProvider } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Visit Rwanda, Land of a Thousand Hills | An Independent Digital Guide",
  description:
    "An independent digital guide to Rwanda for tourists, investors, students, artists, athletes and diaspora. Not affiliated with the Government of Rwanda. Always verify official information at gov.rw, rdb.rw, and irembo.gov.rw.",
  keywords: [
    "Rwanda", "Rwanda travel guide", "gorilla trekking Rwanda", "Kigali",
    "invest in Rwanda", "Rwanda economy", "Akagera", "Nyungwe", "Lake Kivu",
    "Tour du Rwanda", "Rwanda visa guide",
  ],
  authors: [{ name: "Independent Project" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Visit Rwanda",
  },
  openGraph: {
    title: "Visit Rwanda, Land of a Thousand Hills",
    description: "An independent digital guide to Rwanda. Not affiliated with the Government of Rwanda.",
    siteName: "Visit Rwanda Guide",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visit Rwanda, Land of a Thousand Hills",
    description: "An independent digital guide to Rwanda.",
  },
};

export const viewport = {
  themeColor: "#00A1DE",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="icon" href="/icon-192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LangProvider>
            {children}
            <Toaster />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
