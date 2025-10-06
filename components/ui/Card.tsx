import { cn } from "@/lib/utils";

type Props = React.PropsWithChildren<{
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
}>;

export default function Card({ as: Tag = "section", className, title, subtitle, footer, children }: Props) {
  return (
    <Tag
      className={cn(
        // surface
        "surface",
        // spacing
        "p-5 sm:p-6",
        className
      )}
    >
      {(title || subtitle) && (
        <header className="mb-4">
          {title && <h2 className="text-lg font-semibold leading-6">{title}</h2>}
          {subtitle && <p className="mt-1 text-sm opacity-80">{subtitle}</p>}
        </header>
      )}
      <div>{children}</div>
      {footer && <footer className="mt-4 pt-4 divider">{footer}</footer>}
    </Tag>
  );
}
