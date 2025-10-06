// app/layout.tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ConsentBanner from "@/components/ConsentBanner";
import AnalyticsLoader from "@/components/AnalyticsLoader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers"; // <-- this already wraps ThemeProvider

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "OnePage.Tool",
  description: "Lightweight, fast web tools with accessible UX.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans min-h-screen antialiased`}
      >
        <Providers>
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

          <Header />

          <main id="content" className="mx-auto max-w-5xl px-4 py-8">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
