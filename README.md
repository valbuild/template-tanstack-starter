# {{projectName}}

A [Val Build](https://val.build) site on [TanStack Start](https://tanstack.com/start),
bootstrapped with `npm create @valbuild` (or `pnpm create @valbuild`).

Content lives in `*.val.ts` files in this repository — type-checked,
refactorable, reviewable in a pull request — and non-developers edit it in Val
Studio at `/val`.

## Getting Started

Install the dependencies and run the development server with the package
manager you want to use:

```bash
npm install && npm run dev
# or
pnpm install && pnpm dev
# or
yarn && yarn dev
# or
bun install && bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result. Start editing at `src/routes/_site.index.val.ts` — the page updates as
you save.

## Val Studio

Val Studio is at [http://localhost:3000/val](http://localhost:3000/val).

To edit on the page itself, turn Val on for your browser:

```
http://localhost:3000/api/val/enable?redirect_to=/
```

The overlay then appears on every page, and anything read through the hooks in
`src/val/val.hooks.ts` is click-to-editable.

## File structure

| Path                        | What it is                                                    |
| --------------------------- | ------------------------------------------------------------- |
| `val.config.ts`             | Your Val instance: `s`, `c`, `val`, `tanstackRouter`          |
| `val.modules.ts`            | **Every module must be registered here**                      |
| `src/val/val.hooks.ts`      | `useVal` / `useValRoute` — how components read content        |
| `src/val/val.server.ts`     | The Val API, and content reads that must happen on the server |
| `src/routes/_site.tsx`      | The site's layout: header, footer, `ValProvider`              |
| `src/routes/_site.*.val.ts` | A page's content                                              |
| `src/routes/val/`           | Val Studio                                                    |
| `src/routes/api/val.$.ts`   | The Val API endpoint                                          |
| `src/components/`           | TABS components — see `src/components/README.md`              |

Put every page of your site under the `_site` layout (or another layout you
add). `__root.tsx` is the document shell for **every** route, Val Studio
included, so anything site-specific in it would be wrapped around the editor.

## Pages and routes

A Val module that holds a page's content is named after the route file it sits
beside — the `.tsx` becomes `.val.ts` — and its keys are the URLs that route
serves:

| Route file                           | Content module                          | Keys                  |
| ------------------------------------ | --------------------------------------- | --------------------- |
| `src/routes/_site.index.tsx`         | `src/routes/_site.index.val.ts`         | `/`                   |
| `src/routes/_site.products.$sku.tsx` | `src/routes/_site.products.$sku.val.ts` | `/products/product-1` |

`.` and `/` both separate segments, `$param` is a parameter, `$` on its own is
a splat, and `index`, `route`, `(groups)` and `_pathless` layouts add no URL
segment — exactly TanStack Router's own rules. Val validates every key against
the route's pattern, and Val Studio lists these modules as a sitemap under
**Pages**, where an editor can add a page.

`*.val.ts` files under `src/routes` are excluded from the route generator by
`routeFileIgnorePattern`, set in both `vite.config.ts` and `tsr.config.json`.
Without it the generator reads `products.$sku.val.ts` as a route.

## Reading content

**Use the hooks** for anything an editor should be able to click:

```tsx
const page = useValRoute(pageVal, Route.useParams());
```

They resolve the published content when the server renders the page, and
whatever the editor currently holds in a browser with the Studio open.

**Read on the server** only when the content has to exist before the component
does — `head` metadata, a redirect, a `notFound()` that must happen during the
request. It has to go through `createServerFn`: a route `loader` runs in the
browser too, so importing `src/val/val.server.ts` into one puts
`@valbuild/server` (and Node's `fs`) in the client bundle.
`src/routes/_site.products.$sku.tsx` shows both halves.

## Architecture

This project follows the **TABS** architecture: **Typography, Atoms, Base, and
Sections**. Pages are built by composing Sections, which use Atoms, Base
components and Typography primitives. Each layer has clear responsibilities and
strict dependency rules. See
[src/components/README.md](src/components/README.md).

## Validating content

```bash
npm run validate
```

Type-checks the content against your schemas and fixes what it can (image
dimensions, mime types, and other metadata Val can read off the file).

## Package manager

npm, pnpm, yarn and bun all work — nothing here is tied to one.

`npm create @valbuild` / `pnpm create @valbuild` installs with the package
manager you ran it with and leaves exactly one lock file behind: that package
manager's. If you clone this template directly, install with whichever you
prefer.

## Learn More

- [Val Build docs](https://val.build/docs)
- [`@valbuild/tanstack` README](https://github.com/valbuild/val/blob/main/packages/tanstack/README.md)
- [TanStack Start docs](https://tanstack.com/start/latest/docs/framework/react/overview)
- [The Val Build repository](https://github.com/valbuild/val) — feedback and
  contributions welcome
- [Val Build App](https://app.val.build) — connect this project so your team can
  edit content in production

## Deploy

TanStack Start builds to a Nitro server, so it deploys anywhere Node runs —
[Netlify](https://tanstack.com/start/latest/docs/framework/react/hosting),
[Vercel](https://vercel.com/new), Cloudflare, a container.

After deploying, set the project up on [Val Build App](https://app.val.build) so
everyone can edit content in production.
