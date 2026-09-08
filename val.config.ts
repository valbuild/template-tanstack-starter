import { initVal } from "@valbuild/tanstack";

const { s, c, val, config, tanstackRouter } = initVal({
  defaultTheme: "dark",
});

export type { t } from "@valbuild/tanstack";
export { s, c, val, config, tanstackRouter };
