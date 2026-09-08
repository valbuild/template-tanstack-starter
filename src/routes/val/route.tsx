import { Outlet, createFileRoute } from "@tanstack/react-router";
import { ValApp, ValModulesClient } from "@valbuild/tanstack";
import { config } from "../../../val.config";
import valModules from "../../../val.modules";

/**
 * Val Studio, at `/val`.
 *
 * A layout route rather than a leaf, because the Studio navigates within
 * itself — it pushes paths like `/val/~/...`, and those have to resolve to this
 * same page on a reload. `index.tsx` and `$.tsx` beside this file render
 * nothing; they exist so those URLs match.
 *
 * It deliberately sits OUTSIDE `_site`, so the site's header, footer and Val
 * overlay are not wrapped around the editor.
 */
export const Route = createFileRoute("/val")({
  component: ValStudio,
});

function ValStudio() {
  return (
    <ValApp config={config}>
      {/* Hands the Studio your schemas. Needed here AND in _site.tsx. */}
      <ValModulesClient modules={valModules} />
      <Outlet />
    </ValApp>
  );
}
