import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ValModulesClient, ValProvider } from "@valbuild/tanstack";
import { config } from "../../val.config";
import valModules from "../../val.modules";
import Footer from "../components/Footer";
import Header from "../components/Header";

/**
 * The site's layout — everything except Val Studio.
 *
 * Pathless (`_site`), so it adds no URL segment: `_site.index.tsx` is still `/`
 * and `_site.products.$sku.tsx` is still `/products/$sku`. Val modules named
 * after those files follow the same rule, so `_site.products.$sku.val.ts` holds
 * `/products/...` keys.
 *
 * Put every page of your site under here. Keeping it out of `__root` is what
 * keeps the header, the footer and the Val overlay off `/val`.
 */
export const Route = createFileRoute("/_site")({
  component: SiteLayout,
});

function SiteLayout() {
  return (
    /*
     * Everything the site renders goes inside ValProvider: it mounts the Studio
     * overlay, receives edits from it, and re-runs the loaders when one lands.
     *
     * `suspend` opts into the Suspense gate, so a page that exists only in an
     * unpublished draft renders instead of 404ing. Visitors without the Val
     * Enable cookie pay nothing for it.
     */
    <ValProvider config={config} suspend>
      {/* Hands the Studio your schemas. Needed here AND on the /val route. */}
      <ValModulesClient modules={valModules} />
      <Header />
      {/*
       * Required, because `suspend` above means the hooks can suspend.
       *
       * With no boundary between a suspending component and the root, React has
       * nowhere to show a fallback and the whole tree stops updating — which
       * looks like the Studio failing to load. TanStack Start gives you no
       * boundary of its own, so this is the app's job.
       */}
      <Suspense fallback={<main className="page-wrap px-4 py-14" />}>
        <Outlet />
      </Suspense>
      <Footer />
      <TanStackDevtools
        config={{ position: "bottom-left" }}
        plugins={[
          { name: "Tanstack Router", render: <TanStackRouterDevtoolsPanel /> },
        ]}
      />
    </ValProvider>
  );
}
