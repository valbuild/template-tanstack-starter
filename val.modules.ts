import { modules } from "@valbuild/tanstack";
import { config } from "./val.config";

export default modules(config, [
  // Add your modules here.
  //
  // A module that holds a page's content is named after the route file it sits
  // beside, and its keys are the URLs that route serves.
  { def: () => import("./src/routes/_site.index.val") },
  { def: () => import("./src/routes/_site.products.$sku.val") },
]);
