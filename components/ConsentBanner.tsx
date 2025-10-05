"use client";

import { useEffect, useState } from "react";
import { getConsent, setConsent } from "@/lib/consent";

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show the banner only if no stored choice
    setShow(getConsent() === null);
    // Set default denied (EEA style) until user acts — harmless elsewhere
    // @ts-expect-error gtag defined when analytics is injected
    window.gtag?.("consent", "default", {
      ad_personalization: "denied",
      ad_user_data: "denied",
      ad_storage: "denied",
      analytics_storage: "denied",
    });
  }, []);

  if (!show) return null;

  function accept() {
    setConsent("granted");
    setShow(false);
  }
  function decline() {
    setConsent("denied");
    setShow(false);
  }

  // Minimal accessible banner
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-white/95 backdrop-blur px-4 py-3"
    >
      <div className="mx-auto max-w-5xl flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="prose max-w-none">
          <h2 id="consent-title" className="m-0 text-base font-semibold">
            Your privacy choices
          </h2>
          <p className="m-0">
            We use analytics and may show ads. In the EEA/UK, these are blocked until
            you choose. See our <a className="underline" href="/privacy">Privacy Policy</a>.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={decline}
            className="rounded border px-3 py-2 hover:bg-neutral-50"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded bg-black px-3 py-2 text-white hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
