// app/terms/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — OnePage.Tool",
  description:
    "Terms, disclaimers, and acceptable use for OnePage.Tool.",
};

export default function TermsPage() {
  return (
    <main className="prose mx-auto px-4 py-8">
      <h1>Terms of Service</h1>
      <p>
        Use the tools at your own discretion. We provide them “as is”, without
        warranties. You are responsible for verifying results for your use case.
      </p>

      <h2>Acceptable Use</h2>
      <ul>
        <li>No attempts to abuse or overload the service.</li>
        <li>No unlawful, harmful, or misleading use.</li>
      </ul>

      <h2>Liability</h2>
      <p>
        To the maximum extent permitted by law, we are not liable for any loss
        or damage arising from use of the site.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href="mailto:hello@example.com">hello@example.com</a>.
      </p>
    </main>
  );
}
