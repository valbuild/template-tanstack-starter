import { expect, test, type Page } from "@playwright/test";

/**
 * The Studio renders inside a shadow root, so `page.locator` cannot see in.
 *
 * And the store internals the monorepo's tests wait on (`__VAL_STORES__`) are
 * not in the published bundle — it is a dev-only global. Which is fine: what a
 * scaffolded project owes its owner is pixels, so the assertions here read the
 * rendered text and nothing else.
 */
async function studioText(page: Page): Promise<string> {
  return page.evaluate(() => {
    const host = document.getElementById("val-shadow-root");
    return host?.shadowRoot?.textContent ?? "";
  });
}

/** The Studio's own error screen, which is how a crash on mount looks. */
const ERROR_SCREEN = /encountered an error/i;

/** Its resting state with nothing selected. */
const EMPTY_STATE = /Pick a page, a media file or a data item/i;

test("the site renders", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).not.toBeEmpty();
});

test("Val Studio opens", async ({ page }) => {
  await page.goto("/val");

  await expect.poll(() => studioText(page)).toMatch(EMPTY_STATE);
  expect(await studioText(page)).not.toMatch(ERROR_SCREEN);
});

/**
 * The same, with the two web APIs that only exist in a secure context taken
 * away.
 *
 * `crypto.randomUUID` and `navigator.clipboard` exist on `https://` and on
 * `localhost` and NOWHERE else — not "throw when used", absent. A dev server
 * gets opened on a plain-http address that is not `localhost` constantly: a
 * phone on the LAN, a VM, or a browser on Windows reaching a dev server inside
 * WSL at `http://172.23.x.x:3000`. `vite dev` binds `localhost` only, so on WSL
 * that is not an exotic setup — it is what `--host` gets you.
 *
 * This is not hypothetical for this template. Against `@valbuild/*@0.125.0`
 * this test fails exactly as it was reported: the Studio's error screen, with
 * `crypto.randomUUID is not a function`. The fix is in the release after it, so
 * this test also says "the pinned version is new enough".
 *
 * Simulated rather than served because Playwright reaches the app over
 * `localhost`, which is a secure context — and binding the dev server to a
 * routable address to get an insecure origin would make CI depend on the
 * runner's network.
 */
test("Val Studio opens outside a secure context", async ({ page }) => {
  await page.addInitScript(() => {
    // Deleted rather than set to undefined, so `typeof` answers "undefined"
    // exactly as it does in a browser over plain http.
    Reflect.deleteProperty(globalThis.crypto, "randomUUID");
    Reflect.deleteProperty(globalThis.Crypto.prototype, "randomUUID");
    Reflect.deleteProperty(globalThis.Navigator.prototype, "clipboard");
  });

  await page.goto("/val");

  // The premise, asserted rather than assumed: a browser change that puts
  // either global back would leave this passing while testing nothing.
  expect(
    await page.evaluate(() => ({
      randomUUID: typeof globalThis.crypto.randomUUID,
      clipboard: typeof globalThis.navigator.clipboard,
    })),
  ).toEqual({ randomUUID: "undefined", clipboard: "undefined" });

  await expect.poll(() => studioText(page)).toMatch(EMPTY_STATE);
  expect(await studioText(page)).not.toMatch(ERROR_SCREEN);
});
