import { cn } from "../../utils/cn";

export function Heading2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-xl font-semibold text-[var(--sea-ink)] sm:text-2xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
