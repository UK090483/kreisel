import config from "../app.config.json";

export type AppColor = keyof typeof config.colors;
export type AppLocales = keyof typeof config.locales;
