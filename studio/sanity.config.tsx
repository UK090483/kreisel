import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import structure from "./parts/deskStructure";
import { theme } from "https://themer.sanity.build/api/hues?primary=f9de83";

import schema from "./schemas/schema";
import { media } from "sanity-plugin-media";
import { visionTool } from "@sanity/vision";
import { pageByPageType } from "./parts/initialValueTemplates";
import { resolveProductionUrl } from "./parts/resolveProductionUrl";

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
    types: schema,
    templates: (prev) => [pageByPageType, ...prev],
  },

  document: {
    newDocumentOptions: (prev, context) => {
      return prev.filter(
        (i) => !["media.tag", "menuConfig", "seoConfig"].includes(i.templateId)
      );
    },
    actions: (prev, context) => {
      if (
        ["media.tag", "menuConfig", "seoConfig"].includes(context.schemaType)
      ) {
        return prev.filter(
          (p) =>
            !["unpublish", "duplicate", "delete"].includes(p.action || "noname")
        );
      }

      return prev;
    },
    productionUrl: async (prev, context) => {
      return resolveProductionUrl(context.document) || prev;
    },
  },
});
