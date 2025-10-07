import type * as React from "react";
import { cn } from "@/lib/utils"; // if you don’t have cn yet, replace cn(...) with [className strings]. See note below.

type Props = React.PropsWithChildren<{ className?: string; as?: keyof React.JSX.IntrinsicElements}>;

export default function Container({ as: Tag = "div", className, children }: Props) {
  return (
    <Tag className={cn("mx-auto w-full max-w-3xl px-4 sm:px-6 lg:max-w-4xl lg:px-8", className)}>
      {children}
    </Tag>
  );
}
