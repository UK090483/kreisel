import { defineConfig } from "cypress";

import createClient, { SanityClient } from "@sanity/client";
//@ts-ignore
import getIt from "get-it";
//@ts-ignore
import { base, jsonResponse, promise } from "get-it/middleware";

import { addMatchImageSnapshotPlugin } from "cypress-image-snapshot/plugin";

const oneSecMail = getIt([
  base("https://www.1secmail.com/api/v1/"),
  jsonResponse(),
]);

oneSecMail.use(promise({ onlyBody: true }));

let sanityClient: SanityClient;

try {
  sanityClient = createClient({
    projectId: "jgnu3d9f",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-03-25",
  });
} catch (error) {
  console.log(error);
}

// eslint-disable-next-line import/no-unused-modules
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    async setupNodeEvents(on, config) {
      const pages = await sanityClient.fetch<{ slug: string }[]>(
        `*[_type == 'page'][]{'slug': select( defined(pageType) => '/' + pageType->slug.current + '/'+slug.current,slug.current  )}`
      );

      const domains = await oneSecMail({ url: "/?action=getDomainList" });
      const domain = domains[0];
      const name = "test__kreisel__user";

      // const users = await fetch(
      //   "https://jsonplaceholder.cypress.io/users?_limit=3"
      // );

      // console.log(users);

      // implement node event listeners here

      config.env.testMail = { address: `${name}@${domains[0]}`, domain, name };
      config.env.pages = pages;

      return config;
    },
  },

  component: {
    async setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config);

      const image = await sanityClient.fetch<{ _id: string }>(
        `*[_type == "sanity.imageAsset"][7]{...}`
      );

      config.env.image = image;
      config.env.imageRef = {
        asset: {
          _ref: image._id,
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
