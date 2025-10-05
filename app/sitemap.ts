// app/sitemap.ts
export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { getAllTools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date() },
    { url: `${base}/privacy`, lastModified: new Date() },
    { url: `${base}/terms`, lastModified: new Date() },
  ];

  const toolPages: MetadataRoute.Sitemap = getAllTools().map((t) => ({
    url: `${base}/${t.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...toolPages];
}
