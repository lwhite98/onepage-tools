export type ToolInput = {
  id: string;
  label: string;
  type: "number" | "text" | "select";
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
};

export type Tool = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  inputs: ToolInput[];
  compute: (values: Record<string, number | string>) => {
    result: string;
    extra?: Record<string, unknown>;
  };
  // NEW:
  contentHtml?: string; // long-form HTML/MD (rendered safely)
  faq?: { q: string; a: string }[];
  related?: string[];   // other tool slugs
};
