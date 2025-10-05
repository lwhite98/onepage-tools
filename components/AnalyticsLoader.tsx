"use client";

import Script from "next/script";
import { useMemo } from "react";
import { getConsent } from "@/lib/consent";

// Loads gtag *only* if consent is already granted.
// If user grants later via banner, a full page reload isn't strictly needed:
// gtag can be injected later as an enhancement (optional future).
export default function AnalyticsLoader() {
  const consent = useMemo(() => getConsent(), []);
  const GA_ID = process.env.NEXT_PUBLIC_GTAG_ID;

  if (consent !== "granted" || !GA_ID) return null;

  // When consent is granted, inject gtag and configure.
  return (
    <>
      <Script
        id="gtag-base"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          // Respect consent mode: will be "granted" after banner choice
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
