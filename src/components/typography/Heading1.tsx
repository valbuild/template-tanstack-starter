import { cn } from "../../utils/cn";

export function Heading1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "display-title text-3xl leading-tight font-bold tracking-tight text-[var(--sea-ink)] sm:text-5xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}
