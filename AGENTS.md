# Working in this project

A [Val Build](https://val.build) site on [TanStack Start](https://tanstack.com/start)
(React). Content lives in `*.val.ts` files in this repository and is edited
either here or in Val Studio at `/val`.

## Where content lives

- `val.config.ts` — the Val instance: `s` (schemas), `c` (`c.define`), `val`
  (helpers), `tanstackRouter`.
- `val.modules.ts` — **every module has to be registered here.** A module that
  is not in this list does not exist as far as the Studio is concerned.
- `src/routes/*.val.ts` — a page's content. Named after the route file it sits
  beside, and its keys are the URLs that route serves.
- `src/components/**/*.val.ts` — the schemas of the components a page is built
  from.

## Reading content

Use the hooks from `src/val/val.hooks.ts` (`useVal`, `useValRoute`). They work
during server rendering and in the browser, and content read through them is
click-to-editable in the Studio.

Read on the server — `src/val/val.server.ts` — only when the content has to
exist before the component does: `head` metadata, a redirect, a `notFound()`
that must happen during the request. When you do, it **must** go through
`createServerFn`; a route `loader` runs in the browser too, so importing
`val.server` into one puts Node's `fs` in the client bundle.
`src/routes/_site.products.$sku.tsx` is the worked example.

## Rules that are not obvious

- `export default c.define(...)` must be written inline. Assigning to a const
  and exporting that validates fine and then fails at publish time.
- The first argument to `c.define` is the module's own path from the repository
  root, starting with `/`. It has to match the file exactly.
- Route modules are named after their route file: `posts.$postId.tsx` is served
  by `posts.$postId.val.ts`. `.` and `/` both separate segments, `$param` is a
  parameter, `$` is a splat, and `index`, `route`, `(groups)` and `_pathless`
  layouts add no URL segment.
- `*.val.ts` files under `src/routes` are excluded from the route generator by
  `routeFileIgnorePattern` in `vite.config.ts` and `tsr.config.json`. Adding a
  content file needs no change there; removing that setting breaks the build.
- Every page of the site goes under the `_site` layout. `__root.tsx` is the
  shell for `/val` too, so nothing site-specific belongs in it.
- Run `npm run validate` after changing content. It type-checks the content
  against the schemas and fixes what it can.

## Architecture

The components follow **TABS** — Typography, Atoms, Base, Sections. See
[src/components/README.md](src/components/README.md). Pages compose Sections and
nothing else.
