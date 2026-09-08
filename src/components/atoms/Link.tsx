import { Link as RouterLink } from "@tanstack/react-router";

/**
 * A link that works for both kinds of href Val produces.
 *
 * `s.route()` gives an internal path and `s.string()` can give anything, so
 * this takes a plain string rather than TanStack's typed `to` — a CMS value is
 * not known at compile time. Internal paths still go through the router (client
 * navigation, prefetching); anything else is a plain anchor.
 */
export function Link({
  href,
  children,
  ...props
}: { href: string } & Omit<React.ComponentProps<"a">, "href">) {
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  if (isInternal) {
    return (
      <RouterLink to={href} {...props}>
        {children}
      </RouterLink>
    );
  }
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
