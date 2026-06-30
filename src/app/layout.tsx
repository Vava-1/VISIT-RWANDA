import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Visit Rwanda — Land of a Thousand Hills | The Official Digital Gateway",
  description:
    "Rwanda's intelligent digital gateway for tourists, investors, students, artists, athletes and diaspora. Discover destinations, plan trips, explore investment opportunities and connect with the heart of Africa — powered by AI.",
  keywords: [
    "Visit Rwanda", "Rwanda tourism", "gorilla trekking Rwanda", "Kigali",
    "invest in Rwanda", "Rwanda economy", "Akagera", "Nyungwe", "Lake Kivu",
    "Tour du Rwanda", "Rwanda travel", "Rwanda visa",
  ],
  authors: [{ name: "Visit Rwanda Platform" }],
  openGraph: {
    title: "Visit Rwanda — Land of a Thousand Hills",
    description: "The intelligent digital gateway to Rwanda. Tourism, investment, culture & more.",
    siteName: "Visit Rwanda",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visit Rwanda — Land of a Thousand Hills",
    description: "The intelligent digital gateway to Rwanda.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
