/// <reference types="vite/client" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SANITY_STUDIO_PROJECT_ID: string;
      SANITY_STUDIO_DATASET: string;
      SANITY_STUDIO_PREVIEW_SECRET: string;
      NODE_ENV: string;
    }
  }
}

export interface ProcessEnv {
  SANITY_STUDIO_PROJECT_ID: string;
  SANITY_STUDIO_DATASET: string;
  SANITY_STUDIO_PREVIEW_SECRET: string;
  NODE_ENV: string;
}
