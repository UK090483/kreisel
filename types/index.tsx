import config from "../app.config.json";

export * from "../studio/schema";

export type AppSizes = "s" | "m" | "l" | "xl" | "xxl";
export type ImageLayout = "fill" | "contain" | "intrinsic";

export type AppColor = keyof typeof config.colors;
export type AppLocales = keyof typeof config.locales;
