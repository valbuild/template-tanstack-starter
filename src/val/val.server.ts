import { initValContent, initValServer } from "@valbuild/tanstack/server";
import prettier from "prettier";
import { config } from "../../val.config";
import valModules from "../../val.modules";
import prettierOptions from "../../.prettierrc.json";

/**
 * The Val API and the server-side content readers.
 *
 * Built together so they share ONE draft-mode object: the API is what turns
 * preview on for a browser, and the readers are what has to notice it. Two
 * independently created defaults would each work and quietly disagree.
 *
 * The formatter is here because a patch written to disk in local development
 * should come out formatted the way this repo formats everything else.
 *
 * ⚠️ Only import this module from a server route handler or from inside a
 * `createServerFn` handler. A route `loader` runs in the browser too, so
 * importing it there puts `@valbuild/server` — and Node's `fs` — in the client
 * bundle. See `src/routes/_site.products.$sku.tsx` for the pattern.
 */
const { valApiHandler, draftMode } = initValServer(
  valModules,
  { ...config },
  {
    formatter: (code: string, filePath: string) =>
      prettier.format(code, {
        filepath: filePath,
        ...prettierOptions,
      } satisfies prettier.Options),
  },
);

const {
  fetchValStega: fetchVal,
  fetchValKeyStega: fetchValKey,
  fetchValRouteStega: fetchValRoute,
  fetchValRouteUrl,
} = initValContent(config, valModules, { draftMode });

export {
  valApiHandler,
  draftMode,
  fetchVal,
  fetchValKey,
  fetchValRoute,
  fetchValRouteUrl,
};
