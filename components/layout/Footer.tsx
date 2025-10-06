"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm flex flex-wrap items-center gap-4">
        <span>© {new Date().getFullYear()} OnePage.tools</span>
        <Link href="/privacy/" className="underline-offset-4 hover:underline">
          Privacy
        </Link>
        <Link href="/terms/" className="underline-offset-4 hover:underline">
          Terms
        </Link>
      </div>
    </footer>
  );
}
