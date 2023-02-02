import { resolveProductionUrl } from "./parts/resolveProductionUrl";
import structure from "./parts/deskStructure";
import { pageByPageType } from "./parts/initialValueTemplates";
import { resolveActions } from "./parts/resolveActions";
import { resolveBadges } from "./parts/resolveBadges";
import schema from "../PageBuilder/schema";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { documentListWidget } from "sanity-plugin-dashboard-widget-document-list";
import { dashboardTool } from "@sanity/dashboard";
// eslint-disable-next-line import/no-unresolved
import { theme } from "https://themer.sanity.build/api/hues?primary=f9de83";

import { media } from "sanity-plugin-media";
import { visionTool } from "@sanity/vision";
import { vercelDeployTool } from "sanity-plugin-vercel-deploy";

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
    dashboardTool({
      widgets: [
        documentListWidget({
          title: "Mitglieder",
          query: `*[_type == "member" && _id in path('drafts.**') ]`,
          layout: { width: "small" },
        }),
      ],
    }),
    vercelDeployTool(),
  ],
  schema: {
    types: schema,
    templates: (prev) => [pageByPageType, ...prev],
  },

  document: {
    badges: resolveBadges,
    newDocumentOptions: (prev) => {
      return prev.filter(
        (i) => !["menuConfig", "seoConfig"].includes(i.templateId)
      );
    },
    actions: resolveActions,
    productionUrl: resolveProductionUrl,
  },
});
