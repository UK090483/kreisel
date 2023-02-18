import {
  FetchStaticPaths,
  FetchStaticPathsResult2,
  LocationConfig,
} from "../types";
import type { SanityClient } from "@sanity/client";

type getAllSlugsResult = {
  slug: string;
  [k: string]: any;
  pageType: null | string;
  isHome: boolean;
}[];

const getAllSlugs: (
  doc: string,
  client: SanityClient,
  config: LocationConfig,
  query?: string
) => Promise<getAllSlugsResult> = async (doc, client, config) => {
  const i18nQuery = Object.entries(config).reduce((acc, [locale, item]) => {
    if (!item.isDefault) {
      return `${acc} 'slug-${locale}': slug_${locale}.current ,`;
    }
    return acc;
  }, "");

  const allPages = await client.fetch(
    `*[_type == "${doc}"]{ 
        'pageType': pageType->slug.current , 
        'slug': slug.current ,
        'preparedSlug': select(defined(pageType)=> pageType->slug.current +'/'+ slug.current,slug.current ),
        ${i18nQuery}
        'isHome':*[_id == 'siteConfig'][0].indexPage._ref == @._id }`
  );

  if (!allPages || !Array.isArray(allPages)) {
    throw new Error("No Path returned");
  }
  return allPages;
};

const parseFetchResult = (
  allPages: getAllSlugsResult,
  locales: LocationConfig,
  fallback: boolean | "blocking" = "blocking"
): FetchStaticPathsResult2 => {
  const hasI18n = Object.keys(locales).length > 1;
  return {
    paths:
      allPages.reduce((acc, page) => {
        if (!page.slug) return [...acc];
        let pageType = page.pageType && page.pageType.toLowerCase();
        let pageParams = Object.entries(locales).map(([locale, item]) => {
          let slug = item.isDefault
            ? page.slug
            : (page[`slug-${locale}`] as string) || page.slug;

          if (page.isHome) {
            pageType = null;
            slug = "";
          }

          return {
            params: {
              slug: pageType
                ? [pageType, slug.toLowerCase()]
                : [slug.toLowerCase()],
            },
            ...(hasI18n && { locale }),
          };
        });
        return [...acc, ...pageParams];
      }, [] as any[]) || [],
    fallback,
  };
};

type FetchStaticPathsParams = {
  slug?: string[];
};
type FetchStaticPathsResult = {
  paths: { params: FetchStaticPathsParams; locale: string }[];
  fallback: boolean;
};

export const fetchStaticPaths: FetchStaticPaths = async (props) => {
  const {
    doc,
    client,
    locales = { de: { title: "Deutsch", isDefault: true, flag: "🇩🇪" } },
    fallback,
  } = props;

  const allPages = await getAllSlugs(doc, client, locales);
  return parseFetchResult(allPages, locales, fallback);
};
