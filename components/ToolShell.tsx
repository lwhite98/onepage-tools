"use client";

import { useState, useId } from "react";
import { getToolBySlug } from "@/lib/tools";
import AdSlot from "@/components/AdSlot";

type Props = { slug: string };

export default function ToolShell({ slug }: Props) {
  const tool = getToolBySlug(slug)!; // guaranteed by the server page

  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const resultId = useId();

  function handleChange(id: string, val: string) {
    const next = { ...values, [id]: val };
    setValues(next);
    try {
      const res = tool.compute?.(next);
      setResult(res?.result ?? "");
    } catch {
      setResult("");
    }
  }

  async function handleCopy() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="grid gap-8">
      <header className="prose max-w-none">
        <h1>{tool.title}</h1>
        <p>{tool.description}</p>
      </header>

      <div className="grid gap-2 max-w-sm">
        <form className="grid gap-4">
          {tool.inputs?.map((input) => (
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
          <p aria-live="polite" className="text-green-700 text-sm animate-fadeIn">
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

      {/* Mid-page ad */}
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

      {/* Bottom ad */}
      <AdSlot name="tool-bottom" height={250} />
    </section>
  );
}
