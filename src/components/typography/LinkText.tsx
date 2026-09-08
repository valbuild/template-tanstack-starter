import { cn } from "../../utils/cn";
import { Link } from "../atoms/Link";
import { val } from "../../../val.config";

export function LinkText({
  children,
  className,
  href,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      // `val.raw` strips the invisible edit tag out of the URL — it must not be
      // sent to a server — and `val.attrs` puts the path it carried back on the
      // element, which is what makes the link editable in the Studio.
      href={val.raw(href)}
      {...val.attrs({ href, children })}
      className={cn("hover:underline", className)}
    >
      {children}
    </Link>
  );
}
