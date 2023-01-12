import { resolveProductionUrl } from "./parts/resolveProductionUrl";
import schema from "./schemas/schema";
import structure from "./parts/deskStructure";
import { pageByPageType } from "./parts/initialValueTemplates";
import { resolveActions } from "./parts/resolveActions";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
// eslint-disable-next-line import/no-unresolved
import { theme } from "https://themer.sanity.build/api/hues?primary=f9de83";

import { media } from "sanity-plugin-media";
import { visionTool } from "@sanity/vision";

// eslint-disable-next-line import/no-unused-modules
export default defineConfig({
  theme,
  name: "default",
  title: "KREISEL",
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  plugins: [
    deskTool({ structure }),
    media(),
    ...(import.meta.env.MODE === "development" ? [visionTool()] : []),
  ],
  schema: {
    types: [...schema],
    templates: (prev) => [pageByPageType, ...prev],
  },

  document: {
    newDocumentOptions: (prev, context) => {
      return prev.filter(
        (i) => !["menuConfig", "seoConfig"].includes(i.templateId)
      );
    },
    actions: resolveActions,

    productionUrl: async (prev, context) => {
      return resolveProductionUrl(context.document) || prev;
    },
  },
});
