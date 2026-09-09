import { createFileRoute, notFound } from "@tanstack/react-router";
import { NotFound } from "../components/NotFound";
import { createServerFn } from "@tanstack/react-start";
import { val } from "../../val.config";
import { AnySection } from "../components/sections/AnySection";
import { useValRoute } from "../val/val.hooks";
import { fetchValRoute } from "../val/val.server";
import pageVal from "./_site.products.$sku.val";

/**
 * The page title, read on the server.
 *
 * `head` runs before the component does, so this one genuinely has to be a
 * server read — and it has to go through `createServerFn`. A route `loader`
 * runs in the browser too (that is what makes a client navigation work), so
 * importing `val.server` straight into a loader would put `@valbuild/server`,
 * and Node's `fs` with it, in the client bundle. `createServerFn` is compiled
 * away on the client and everything only its handler uses goes with it.
 */
const getMeta = createServerFn()
  .validator((params: { sku: string }) => params)
  .handler(async ({ data }) => {
    const page = await fetchValRoute(pageVal, data);
    if (!page) {
      return null;
    }
    /*
     * `val.raw`, because this ends up in `<title>` and `<meta>`.
     *
     * Every string Val hands a component carries an invisible edit tag, which
     * is what makes it click-to-editable on the page. In markup a browser reads
     * rather than renders — a title, a meta description, a URL — those
     * characters are noise at best, so strip them.
     */
    return {
      meta: {
        title: val.raw(page.meta.title),
        description: val.raw(page.meta.description),
      },
    };
  });

export const Route = createFileRoute("/_site/products/$sku")({
  loader: async ({ params }) => {
    const result = await getMeta({ data: params });
    if (!result) {
      throw notFound();
    }
    return result;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.meta.title },
      { name: "description", content: loaderData?.meta.description },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  // The page's own content still comes from the hook, so it stays editable on
  // the page. The route's params go in unchanged — `useValRoute` turns them
  // into the record key by way of this module's file name.
  const pageContent = useValRoute(pageVal, Route.useParams());
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
