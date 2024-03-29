import { resolveProductionUrl } from "./parts/resolveProductionUrl";
import structure, { defaultDocumentNode } from "./parts/deskStructure";
import { pageByPageType } from "./parts/initialValueTemplates";
import { resolveActions } from "./parts/resolveActions";
import { resolveBadges } from "./parts/resolveBadges";
import schema from "../PageBuilder/schema";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { documentListWidget } from "sanity-plugin-dashboard-widget-document-list";
import { dashboardTool, projectUsersWidget } from "@sanity/dashboard";
// eslint-disable-next-line import/no-unresolved
// import { theme } from "https://themer.sanity.build/api/hues?primary=f9de83";

import { media } from "sanity-plugin-media";
import { visionTool } from "@sanity/vision";
import { vercelDeployTool } from "sanity-plugin-vercel-deploy";
// *[_type == 'page' && content[].content[].children[].text match "lorem"  ]
// eslint-disable-next-line import/no-unused-modules
export default defineConfig({
  // theme,
  name: "default",
  title: "KREISEL",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  plugins: [
    deskTool({ structure, defaultDocumentNode }),
    media(),
    ...(process.env.NODE_ENV === "development" ? [visionTool()] : []),
    dashboardTool({
      widgets: [
        projectUsersWidget(),
        documentListWidget({
          title: "Mitglieder",
          query: `*[_type == "member" && _id in path('drafts.**') ]`,
          layout: { width: "small" },
        }),
        documentListWidget({
          title: "Mitglieder bei denen der show Status nicht Überein stimmt",
          query: `*[_type == "member" && show != wantsPublicProfile]`,
          layout: { width: "small" },
          limit: 100,
        }),
        documentListWidget({
          title: "Has Lorem text",
          query: `*[_type == 'page' && content[].content[].children[].text match "lorem"  ]`,
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
