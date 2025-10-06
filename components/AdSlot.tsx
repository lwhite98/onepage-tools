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
      className="panel grid place-items-center text-sm text-gray-500"
      style={{ minHeight: height }}
      aria-label={`Ad placeholder: ${name}`}
    >
      <span>Ad Placeholder: {name}</span>
    </div>
  );
}
