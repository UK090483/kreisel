import path from "path";
import { defineCliConfig } from "sanity/cli";

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
          PageBuilder: path.join(path.dirname(__dirname), "/PageBuilder"),
        },
      },
    };
  },
});
