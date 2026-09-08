import { initValClient } from "@valbuild/tanstack/client";
import { config } from "../../val.config";

/**
 * Val's hooks — the everyday way to read content.
 *
 * NOT named `val.client.ts`, deliberately. TanStack Start's import protection
 * denies any file whose name matches the client-only glob (anything with
 * `.client.` in it) to server code, and these hooks are isomorphic: they run
 * during server rendering as well as in the browser. A route importing such a
 * file fails the build with "Import denied in server environment".
 *
 * They work in both places a component runs: during server rendering they
 * resolve the published content, and in a browser with Val Studio open they
 * resolve what the editor currently holds, so an edit shows up as it is typed.
 * Content read this way is also click-to-editable on the page.
 */
const {
  useValStega: useVal,
  useValRouteStega: useValRoute,
  useValRouteUrl,
} = initValClient(config);

export { useVal, useValRoute, useValRouteUrl };
