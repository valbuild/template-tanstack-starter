import { createFileRoute } from "@tanstack/react-router";
import { valApiHandler } from "../../val/val.server";

/**
 * The Val API.
 *
 * `/api/val/$`, not `/api/val`: every endpoint has a sub-path — `/sources/~`,
 * `/draft/stat`, `/static/...` — so the splat is the whole surface.
 */
export const Route = createFileRoute("/api/val/$")({
  server: {
    handlers: {
      GET: ({ request }) => valApiHandler(request),
      POST: ({ request }) => valApiHandler(request),
      PUT: ({ request }) => valApiHandler(request),
      PATCH: ({ request }) => valApiHandler(request),
      DELETE: ({ request }) => valApiHandler(request),
      HEAD: ({ request }) => valApiHandler(request),
    },
  },
});
