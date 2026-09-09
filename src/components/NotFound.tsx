import { Link } from "@tanstack/react-router";

/**
 * The site's 404.
 *
 * With Val this is a page an editor can reach by accident — a route whose
 * content entry has not been created yet, or one they have just deleted — so it
 * should look like part of the site rather than like a crash.
 */
export function NotFound() {
  return (
    <main className="page-wrap px-4 pt-14 pb-8">
      <section className="island-shell rounded-[2rem] px-6 py-10 sm:px-10">
        <p className="island-kicker mb-3">404</p>
        <h1 className="display-title mb-4 text-3xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-4xl">
          This page has no content yet
        </h1>
        <p className="mb-6 text-[var(--sea-ink-soft)]">
          If you are editing in Val Studio, add an entry for this route under{" "}
          <strong>Pages</strong>.
        </p>
        <Link
          to="/"
          className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline"
        >
          Back to the home page
        </Link>
      </section>
    </main>
  );
}
