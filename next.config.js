const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const sanityClient = require("@sanity/client");

const client = sanityClient({
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

  console.log("redirectData", redirectData);

  return redirectData;
}

/** @type {import('next').NextConfig} */
const moduleExports = {
  // async rewrites() {
  //   const sanityRedirects = await fetchSanityRedirects();
  //   return sanityRedirects;
  // },
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "cdn.sanity.io"],
    deviceSizes: [420, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [8, 16, 32, 48, 64, 96, 128, 256, 384],
  },

  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_PROJECT_DATASET: process.env.SANITY_PROJECT_DATASET,
  },
  async redirects() {
    const sanityRedirects = await fetchSanityRedirects();

    return sanityRedirects;
    // return [
    //   {
    //     source: "/home",
    //     destination: "/",
    //     permanent: true,
    //   },
    // ];
  },
  webpack(config, options) {
    const { dev, isServer } = options;

    // Do not run type checking twice:
    if (dev && isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    return config;
  },
};

module.exports = moduleExports;
