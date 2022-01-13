import type { SanityClient } from "@sanity/client/sanityClient";

import { FetchStaticPaths, LocationConfig } from "../types";

const getAllDocSlugs: (
  doc: string,
  client: SanityClient,
  config: LocationConfig
) => Promise<
  | null
  | {
      slug: string;
      [k: string]: any;
      pageType: null | string;
      isHome: boolean;
    }[]
> = async (doc, client, config) => {
  const i18nQuery = Object.entries(config).reduce((acc, [locale, item]) => {
    if (!item.isDefault) {
      return `${acc} 'slug-${locale}': slug_${locale}.current ,`;
    }
    return acc;
  }, "");

  return client.fetch(
    `*[_type == "${doc}"]{ 
        ...,
        'pageType': pageType->slug.current , 
        'slug': slug.current ,
        ${i18nQuery}
        'isHome':*[_id == 'siteConfig'][0].indexPage._ref == @._id }
    `
  );
};

export type FetchStaticPathsParams = {
  slug?: string[];
};
export type FetchStaticPathsResult = {
  paths: { params: FetchStaticPathsParams; locale: string }[];
  fallback: boolean;
};

export const fetchStaticPaths: FetchStaticPaths = async (props) => {
  const {
    doc,
    client,
    config = { de: { title: "Deutsch", isDefault: true, flag: "🇩🇪" } },
  } = props;

  const allPages = await getAllDocSlugs(doc, client, config);
  if (!allPages || !Array.isArray(allPages)) {
    throw new Error("No Path returned");
  }
  const hasI18n = Object.keys(config).length > 1;
  return {
    paths:
      allPages.reduce((acc, page) => {
        if (!page.slug) return [...acc];
        let pageType = page.pageType && page.pageType.toLowerCase();
        let pageParams = Object.entries(config).map(([locale, item]) => {
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
    fallback: false,
  };
};

export {};
