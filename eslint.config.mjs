import js from "@eslint/js";
import tseslint from "typescript-eslint";
import valbuild from "@valbuild/eslint-plugin";

export default [
  {
    ignores: ["dist", ".output", ".nitro", ".tanstack", "src/routeTree.gen.ts"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // @valbuild/eslint-plugin only ships a legacy (eslintrc) `recommended`
  // config, so register the plugin and its rules directly for flat config.
  //
  // What they catch is the class of mistake that only shows up at publish time:
  // a `c.define` whose first argument is not this file's own path, a module
  // that is not registered in val.modules.ts, an export shape the server's AST
  // rewrite cannot write back.
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "@valbuild": valbuild },
    rules: valbuild.configs.recommended.rules,
  },
];
