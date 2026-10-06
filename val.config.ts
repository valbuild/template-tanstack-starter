import { initVal } from "@valbuild/tanstack";

const { s, c, val, config, tanstackRouter } = initVal({
  defaultTheme: "dark",
  // Every image, file and video is stored on Val's remote content host. The
  // Val app requires it: a project there will not start without it, and
  // `val publish` refuses to build.
  files: { remote: true },
});

export type { t } from "@valbuild/tanstack";
export { s, c, val, config, tanstackRouter };
