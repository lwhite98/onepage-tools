// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConsentBanner from "@/components/ConsentBanner";
import AnalyticsLoader from "@/components/AnalyticsLoader";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "OnePage.Tool",
  description: "Lightweight, fast web tools with accessible UX.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen bg-white text-neutral-900 antialiased`}>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 rounded bg-black px-3 py-2 text-white"
        >
          Skip to content
        </a>

        {/* Load analytics only if consent is already granted */}
        <AnalyticsLoader />

        {/* Consent banner appears until the user chooses */}
        <ConsentBanner />

        <header className="border-b">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold">OnePage.Tool</Link>
            <nav aria-label="Main">
              <Link href="/" className="underline-offset-4 hover:underline">Home</Link>
            </nav>
          </div>
        </header>

        <main id="content" className="mx-auto max-w-5xl px-4 py-8">
          {children}
        </main>

        <footer className="mt-12 border-t">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} OnePage.Tool</span>
            <Link href="/privacy" className="underline-offset-4 hover:underline">Privacy</Link>
            <Link href="/terms" className="underline-offset-4 hover:underline">Terms</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
