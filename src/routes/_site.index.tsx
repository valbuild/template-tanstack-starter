import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "../components/NotFound";
import { AnySection } from "../components/sections/AnySection";
import { useValRoute } from "../val/val.hooks";
import pageVal from "./_site.index.val";

export const Route = createFileRoute("/_site/")({
  head: () => ({ meta: [{ title: "Home" }] }),
  component: Home,
});

function Home() {
  /*
   * Read in the component, which is the everyday way.
   *
   * The hook resolves the published content when the server renders this, and
   * whatever the editor currently holds in a browser with Val Studio open — so
   * an edit shows up as it is typed, and every string on the page is
   * click-to-editable. Nothing server-only is imported here.
   */
  const pageContent = useValRoute(pageVal, {});
  if (!pageContent) {
    /*
     * Returned, not thrown.
     *
     * `notFound()` is for a loader. Thrown from a component it escapes into the
     * error boundary instead — the right page still renders, but every miss
     * logs `Error in renderToReadableStream` during server rendering. Reading
     * content in the component is Val's normal path, so a page with no entry
     * has to be an ordinary render rather than an exception.
     */
    return <NotFound />;
  }
  return (
    <main className="page-wrap px-4 pt-10 pb-8">
      {pageContent.sections.map((section, index) => (
        <AnySection key={`${section.type}-${index}`} section={section} />
      ))}
    </main>
  );
}
