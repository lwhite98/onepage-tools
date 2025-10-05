"use client";

import { useState, useId, useMemo, useEffect } from "react";
import { getToolBySlug } from "@/lib/tools";
import type { Tool } from "@/lib/types";
import AdSlot from "@/components/AdSlot";

type Props = { slug: string };

export default function ToolShell({ slug }: Props) {
  const tool = getToolBySlug(slug);
  if (!tool) return <p>Tool not found.</p>;

  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const resultId = useId();

  function handleChange(id: string, val: string) {
    const next = { ...values, [id]: val };
    setValues(next);
    try {
      const res = tool.compute(next);
      setResult(res.result);
    } catch {
      setResult("");
    }
  }

  async function handleCopy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Copy failed");
    }
  }

  const form = useMemo(
    () => (
      <form className="grid gap-4 max-w-sm">
        {tool.inputs.map((input) => (
          <div key={input.id} className="grid gap-1">
            <label htmlFor={input.id} className="font-medium">
              {input.label}
            </label>
            <input
              id={input.id}
              name={input.id}
              type={input.type}
              min={input.min}
              max={input.max}
              step={input.step}
              placeholder={input.placeholder}
              className="w-full rounded border px-2 py-2"
              onChange={(e) => handleChange(input.id, e.target.value)}
              aria-describedby={result ? resultId : undefined}
            />
          </div>
        ))}
      </form>
    ),
    [tool.inputs, resultId, result]
  );

  return (
    <section className="grid gap-8">
      {/* Title & Description */}
      <header className="prose max-w-none">
        <h1>{tool.title}</h1>
        <p>{tool.description}</p>
      </header>

      {/* Inputs + Result (aria-live) */}
      <div className="grid gap-2 max-w-sm">
        {form}
        <div
          id={resultId}
          role="status"
          aria-live="polite"
          className="rounded border bg-neutral-50 px-3 py-2 font-semibold flex items-center justify-between"
        >
          <span>{result ? `Result: ${result}` : "Result will appear here."}</span>
          {result && (
            <button
              type="button"
              onClick={handleCopy}
              className="text-sm rounded border px-2 py-1 ml-2 hover:bg-neutral-100"
            >
              Copy
            </button>
          )}
        </div>
        {copied && (
          <p
            aria-live="polite"
            className="text-green-700 text-sm animate-fadeIn"
          >
            ✅ Copied to clipboard
          </p>
        )}
      </div>

      {/* Long-form content */}
      {tool.contentHtml ? (
        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: tool.contentHtml }}
        />
      ) : null}
      
      {/* 👇 Add a mid-page ad placeholder */}
      <AdSlot name="tool-mid" height={120} />
      
      {/* FAQ */}
      {tool.faq?.length ? (
        <section className="prose max-w-none">
          <h2>Frequently asked questions</h2>
          <dl>
            {tool.faq.map((f, i) => (
              <div key={i} className="mb-4">
                <dt className="font-semibold">{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {/* 👇 Add a bottom ad placeholder */}
      <AdSlot name="tool-bottom" height={250} />

    </section>
  );
}
