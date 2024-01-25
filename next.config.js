const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { createClient } = require("@sanity/client");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const client =
  process.env.NODE_ENV === "test"
    ? () => ({ fetch: () => ({}) })
    : createClient({
        dataset: process.env.SANITY_PROJECT_DATASET,
        projectId: process.env.SANITY_PROJECT_ID,
        useCdn: process.env.NODE_ENV === "production",
        apiVersion: "2022-08-30",
      });

async function fetchSanityRedirects() {
  const redirectData = await client.fetch(`
    *[_id == 'siteConfig'][0].redirects[]{
      "source":  from,
      "destination":  to,
      "permanent": permanent == true
    }
  `);
  return redirectData;
}

/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,

  images: {
    domains: ["cdn.sanity.io"],
  },
  experimental: { scrollRestoration: true },
  eslint: { dirs: ["PageBuilder", "components", "hooks", "lib", "services"] },
  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_PROJECT_DATASET: process.env.SANITY_PROJECT_DATASET,
  },
  async redirects() {
    return await fetchSanityRedirects();
  },
  // webpack(config, options) {
  //   const { dev, isServer } = options;
  //   // Do not run type checking twice:
  //   if (dev && isServer) {
  //     config.plugins.push(new ForkTsCheckerWebpackPlugin());
  //   }

  //   return config;
  // },
};

module.exports = moduleExports;
