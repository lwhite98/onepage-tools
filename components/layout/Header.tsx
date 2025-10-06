"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";


export default function Header() {
  return (
    <header className="site-header">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight hover:opacity-80">
          OnePage<span className="text-[--color-primary]">.tools</span>
        </Link>
        <nav aria-label="Main" className="flex gap-4 text-sm font-medium">
          <Link href="/" className="underline-offset-4 hover:underline">
            Home
          </Link>
          <Link href="/privacy/" className="underline-offset-4 hover:underline">
            Privacy
          </Link>
          <Link href="/terms/" className="underline-offset-4 hover:underline">
            Terms
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
