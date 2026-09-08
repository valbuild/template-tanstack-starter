import { createFileRoute } from "@tanstack/react-router";

// `/val` itself — the layout beside this file is the whole page.
export const Route = createFileRoute("/val/")({
  component: () => null,
});
