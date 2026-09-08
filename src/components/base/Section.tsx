import { cn } from "../../utils/cn";

export function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "island-shell mt-8 flex flex-col gap-4 rounded-[1.5rem] p-6 sm:p-8",
        className,
      )}
    >
      {children}
    </section>
  );
}
