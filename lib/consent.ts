export type ConsentChoice = "granted" | "denied";

const KEY = "onepage.consent"; // localStorage key

export function getConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(KEY);
  return v === "granted" || v === "denied" ? v : null;
}

export function setConsent(choice: ConsentChoice) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, choice);

  // Update Google Consent Mode v2
  const update = (val: "granted" | "denied") => {
    // @ts-expect-error gtag exists when analytics is loaded
    window.gtag?.("consent", "update", {
      ad_personalization: val,
      ad_user_data: val,
      ad_storage: val,
      analytics_storage: val,
    });
  };
  update(choice);
}
