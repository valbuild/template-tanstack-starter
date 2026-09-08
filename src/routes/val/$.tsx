import { createFileRoute } from "@tanstack/react-router";

// Everything under `/val`, so the Studio's own navigation survives a reload.
export const Route = createFileRoute("/val/$")({
  component: () => null,
});
