"use client";

/**
 * CLS-safe placeholder for future ads.
 * Keeps fixed height so layout never shifts.
 * Can later load AdSense, carbon, or other scripts dynamically.
 */
export default function AdSlot({
  name,
  height = 120,
}: {
  name: string;
  height?: number;
}) {
  return (
    <div
      className="my-8 flex items-center justify-center border border-dashed border-neutral-300 bg-neutral-50 text-neutral-500 text-sm"
      style={{ minHeight: height }}
      aria-label={`Ad placeholder: ${name}`}
    >
      <span>Ad Placeholder: {name}</span>
    </div>
  );
}
