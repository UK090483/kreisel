import {
  LocationConfig,
  FetchStaticPathsResult2,
} from "lib/SanityPageBuilder/types";
import { defaultLocales } from "./defaultValues";
import { GetSlugsResult } from "./getSlugs";

export type ParseSlugsProps = {
  getSlugResult: GetSlugsResult;
  locales?: LocationConfig;
  fallback?: boolean | "blocking";
};

const parseSlugs = (props: ParseSlugsProps): FetchStaticPathsResult2 => {
  const {
    getSlugResult,
    locales = defaultLocales,
    fallback = "blocking",
  } = props;

  if (
    !getSlugResult ||
    !getSlugResult.slugs ||
    !Array.isArray(getSlugResult.slugs)
  ) {
    throw new Error("parseSlugs did not get useful data on  getSlugResult");
  }
  const hasI18n = Object.keys(locales).length > 1;
  return {
    paths:
      getSlugResult.slugs.reduce((acc, page) => {
        if (!page.slug) return [...acc];

        let pageParams = Object.entries(locales).map(([locale, item]) => {
          let slug = item.isDefault
            ? page.slug
            : (page[`slug-${locale}`] as string) || page.slug;

          return {
            params: {
              slug: slug.split("/").map((i) => i.toLowerCase()),
            },
            ...(hasI18n && { locale }),
          };
        });
        return [...acc, ...pageParams];
      }, [] as any[]) || [],
    fallback,
  };
};

export default parseSlugs;
