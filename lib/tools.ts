import type { Tool } from "./types";

export const tools: Tool[] = [
  {
    slug: "percentage-calculator",
    title: "Percentage Calculator",
    description: "Find X% of Y quickly.",
    keywords: ["percent", "percentage", "calculator"],
    inputs: [
      { id: "x", label: "X (percent)", type: "number", min: 0, step: 0.01 },
      { id: "y", label: "Y (value)", type: "number", min: 0, step: 0.01 },
    ],
    compute(values) {
      const x = Number(values.x);
      const y = Number(values.y);
      const value = (x / 100) * y;
      return { result: value.toLocaleString(undefined, { maximumFractionDigits: 6 }) };
    },
    // NEW:
    contentHtml: `
      <h2>How to use</h2>
      <ol>
        <li>Enter a percentage (X).</li>
        <li>Enter a value (Y).</li>
        <li>The result shows X% of Y instantly.</li>
      </ol>
      <h3>Example</h3>
      <p>15% of 200 = 30.</p>
    `,
    faq: [
      { q: "How do I calculate percentage change?", a: "((new - old) / old) × 100." },
      { q: "Can I use decimals?", a: "Yes. For example, X = 12.5 and Y = 199.99." },
    ],
    related: [],
  },
];

export const getAllTools = () => tools;
export const getToolBySlug = (slug: string) => tools.find(t => t.slug === slug);
