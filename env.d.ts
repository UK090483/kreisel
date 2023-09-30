declare namespace NodeJS {
  interface ProcessEnv {
    EMAIL_SERVER_USER: string;
    EMAIL_SERVER_PASSWORD: string;
    EMAIL_SERVER_HOST: string;
    EMAIL_SERVER_PORT: number;
    EMAIL_FROM: string;
    AUTH_SECRET: string;
    IRONSESSION_PASSWORD: string;
  }
}
