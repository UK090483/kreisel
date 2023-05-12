import { defineCliConfig } from "sanity/cli";
import path from "path";

// eslint-disable-next-line import/no-unused-modules
export default defineCliConfig({
  api: {
    projectId: "jgnu3d9f",
    dataset: "production",
  },
  vite: (prevConfig) => {
    return {
      ...prevConfig,

      resolve: {
        ...prevConfig.resolve,
        alias: {
          ...prevConfig.resolve?.alias,
          "@": __dirname,
          PageBuilder: path.join(path.dirname(__dirname), "./PageBuilder"),
        },
      },
    };
  },
});
