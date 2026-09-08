import { cn } from "../../utils/cn";
import type { Variants } from "../base/variants.val";

export const className =
  "inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold no-underline transition hover:-translate-y-0.5";
export const variants: Record<Variants, string> = {
  accent:
    "border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] text-[var(--lagoon-deep)] hover:bg-[rgba(79,184,178,0.24)]",
  primary:
    "border border-[var(--line)] bg-[var(--surface-strong)] text-[var(--sea-ink)] hover:border-[rgba(23,58,64,0.35)]",
  secondary:
    "border border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)]",
};

export type ButtonProps = {
  variant?: Variants;
  children: React.ReactNode;
};

export function Button({ variant = "primary", children }: ButtonProps) {
  return (
    <button className={cn(className, variants[variant])}>{children}</button>
  );
}
