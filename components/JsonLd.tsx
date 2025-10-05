// components/JsonLd.tsx
import React from "react";

export default function JsonLd({ json }: { json: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Note: JSON.stringify with no spaces keeps it small
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
