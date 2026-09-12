import { defineConfig } from "@playwright/test";

/**
 * Does a project scaffolded from this template actually work?
 *
 * The only test there is here, and deliberately the shallowest possible one:
 * this repository is a starting point, not a product, so what it owes anyone is
 * that the site renders and that Val Studio opens. Everything below that — how
 * a field edits, how a patch syncs — belongs to `valbuild/val` and is tested
 * there against its own example apps.
 *
 * What this catches that nothing in `valbuild/val` can: a broken PUBLISHED
 * release. The `@valbuild/*` versions in `package.json` are pinned, the Studio
 * bundle served at `/api/val/static/<version>/app` is the built one from npm,
 * and the whole thing is installed the way `pnpm create @valbuild` installs it.
 * That is a different artifact from anything the monorepo's own suite loads.
 *
 * Hence the schedule in `.github/workflows/check.yml`: this runs weekly with
 * nothing changed, because "the release we pin stopped working" and "someone
 * edited this repo" are both things worth finding out about.
 *
 * Run it by hand with:
 *
 *   npm install --no-save --no-package-lock @playwright/test
 *   npx playwright install --with-deps chromium
 *   npx playwright test --config .github/smoke/playwright.config.ts
 */
export default defineConfig({
  testDir: ".",
  // The dev server compiles on demand, and CI runners are not fast.
  timeout: 120_000,
  expect: { timeout: 30_000 },
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 180_000,
    // The project root, not this directory: `cwd` defaults to the config's own
    // folder, and `npm run dev` there would find no package.json.
    cwd: process.cwd(),
  },
});
