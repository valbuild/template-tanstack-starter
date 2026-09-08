import { cn } from "../../utils/cn";

export function Paragraph({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("min-h-4 text-[var(--sea-ink-soft)]", className)}>
      {children}
    </p>
  );
}
