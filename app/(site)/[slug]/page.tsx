import { getToolBySlug, getAllTools } from "@/lib/tools";
import { notFound } from "next/navigation";
import ToolShell from "@/components/ToolShell";
import JsonLd from "@/components/JsonLd";
import { ogDefaults, canonical } from "@/lib/seo";

export function generateStaticParams() {
  return getAllTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return ogDefaults(`${tool.title} — OnePage.Tool`, tool.description, `/${slug}`);
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return notFound();

  const url = canonical(`/${slug}`);

  return (
    <>
      {/* SoftwareApplication JSON-LD */}
      <JsonLd
        json={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: tool.title,
          applicationCategory: "WebApplication",
          operatingSystem: "Any",
          url,
          description: tool.description,
        }}
      />

      {/* Optional: FAQ JSON-LD if you provided FAQs */}
      {tool.faq?.length ? (
        <JsonLd
          json={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: tool.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      ) : null}

      <ToolShell slug={slug} />
    </>
  );
}
