// app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — OnePage.Tool",
  description:
    "How OnePage.Tool handles cookies, consent, and any data you share.",
};

export default function PrivacyPage() {
  return (
    <main className="prose mx-auto px-4 py-8">
      <h1>Privacy Policy</h1>
      <p>
        We aim to keep things simple. Our tools run in your browser and we do
        not store your inputs on a server.
      </p>

      <h2>Cookies & Consent</h2>
      <p>
        In the EEA/UK, ad and analytics storage are blocked until you grant
        consent (Google Consent Mode v2). You can change your choice at any
        time from the consent banner we’ll add later.
      </p>

      <h2>Data We Process</h2>
      <ul>
        <li>Tool inputs: processed locally in your browser.</li>
        <li>
          Analytics (aggregated): page views and performance metrics (no
          tracking cookies without consent in the EEA/UK).
        </li>
      </ul>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href="mailto:hello@example.com">hello@example.com</a>.
      </p>
    </main>
  );
}
