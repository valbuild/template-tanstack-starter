import { cn } from "../../utils/cn";
import {
  className as buttonClassName,
  variants as buttonVariants,
} from "./Button";
import { Link } from "./Link";
import type { Variants } from "../base/variants.val";

export function LinkButton({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  variant?: Variants;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(buttonClassName, buttonVariants[variant], className)}
    >
      {children}
    </Link>
  );
}
