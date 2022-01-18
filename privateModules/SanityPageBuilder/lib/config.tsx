export const config = {
  dataset: process.env.SANITY_PROJECT_DATASET || "",
  projectId: process.env.SANITY_PROJECT_ID || "",
  // useCdn: process.env.NODE_ENV === 'production',
  useCdn: false,
  apiVersion: "2021-03-25",
};
