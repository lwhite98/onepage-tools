// components/ToolClient.tsx
"use client";

import { useState } from "react";
import { getToolBySlug } from "@/lib/tools";

export default function ToolClient({ slug }: { slug: string }) {
  const tool = getToolBySlug(slug);
  if (!tool) return <p>Tool not found.</p>;

  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string>("");

  function handleChange(id: string, val: string) {
    const next = { ...values, [id]: val };
    setValues(next);
    try {
      const res = tool.compute(next); // safe: runs on client now
      setResult(res.result);
    } catch {
      setResult("");
    }
  }

  return (
    <section className="prose max-w-none">
      <h1>{tool.title}</h1>
      <form className="grid gap-4 max-w-sm">
        {tool.inputs.map((input) => (
          <label key={input.id} className="block">
            <span>{input.label}</span>
            <input
              type={input.type}
              min={input.min}
              step={input.step}
              className="w-full rounded border px-2 py-1"
              onChange={(e) => handleChange(input.id, e.target.value)}
            />
          </label>
        ))}
      </form>
      <p aria-live="polite" className="mt-4 font-semibold">
        {result && `Result: ${result}`}
      </p>
    </section>
  );
}
