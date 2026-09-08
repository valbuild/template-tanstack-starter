import { cn } from "../../utils/cn";

export function Heading3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-base font-semibold text-[var(--sea-ink)] sm:text-lg",
        className,
      )}
    >
      {children}
    </h3>
  );
}
