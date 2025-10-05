// lib/seo.ts
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const canonical = (path = "/") =>
  new URL(path.startsWith("/") ? path : `/${path}`, SITE_URL).toString();

export const ogDefaults = (title: string, description: string, path: string) => ({
  title,
  description,
  alternates: { canonical: canonical(path) },
  openGraph: {
    url: canonical(path),
    siteName: "OnePage.Tool",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
});
