import testUser from "./testUser";
import { defineConfig } from "cypress";

import { createClient } from "@sanity/client";

// import fetch from "node-fetch";

// //@ts-ignore
// import { getIt } from "get-it";
// //@ts-ignore
// import { base, jsonResponse, promise } from "get-it/middleware";

import { addMatchImageSnapshotPlugin } from "cypress-image-snapshot/plugin";

// const oneSecMail = getIt([
//   base("https://www.1secmail.com/api/v1/"),
//   jsonResponse(),
// ]);

// const devMail = getIt([
//   base("https://www.developermail.com/api/v1/"),
//   jsonResponse(),
// ]);

// oneSecMail.use(promise({ onlyBody: true }));

// devMail.use(promise({ onlyBody: true }));

let sanityClient = createClient({
  projectId: "jgnu3d9f",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-03-25",
});

// eslint-disable-next-line import/no-unused-modules
export default defineConfig({
  e2e: {
    retries: { openMode: 3, runMode: 3 },
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: "http://localhost:3000/",
    async setupNodeEvents(on, config) {
      const pages = await sanityClient.fetch<{ slug: string }[]>(
        `*[_type == 'page' && defined(slug) ][]{'slug': select( defined(pageType) => '/' + pageType->slug.current + '/'+ slug.current, '/' + slug.current   )}`
      );

      config.env.testUser = testUser;
      config.env.pages = pages;

      const response = await fetch(`${config.baseUrl}/api/ping`);
      const ping = await response.json();
      config.baseUrl = ping.baseUrl;

      return config;
    },
  },

  component: {
    video: false,
    viewportWidth: 1920,
    viewportHeight: 600,
    async setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config);

      const image = await sanityClient.fetch<{
        imageDocument: { _id: string };
        imageResult: any;
      }>(
        `{ 
          'imageDocument': *[_type == "sanity.imageAsset"][22]{...,'alt':'testImage'}, 
          'imageResult':*[_type == "sanity.imageAsset"][22]{ url, 'aspectRatio':metadata.dimensions.aspectRatio,"lqip":metadata.lqip,}
        }`
      );

      config.env.image = image.imageDocument;
      config.env.imageResult = image.imageResult;
      config.env.imageRef = {
        asset: {
          _ref: image.imageDocument._id,
          _type: "reference",
        },
      };

      return config;
    },
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
