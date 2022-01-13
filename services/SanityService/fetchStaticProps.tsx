import type { SanityClient } from "@sanity/client/sanityClient";
import {
  body,
  PageQueryResult,
} from "@services/pageBuilderService/ContentParser";
import { siteQuery } from "./siteQuery";
import { Page } from "types";
import type { FetchStaticPathsParams } from "./fetchStaticPaths";
import { SiteSettingResult } from "./siteQuery";
import {
  footerQuery,
  FooterQueryResult,
} from "@components/Layout/Footer/Footer";

type FetchPageProps = {
  query: string;
  slug: string;
  preview?: boolean;
  sanityClient: SanityClient;
};

export async function fetchPage<P>({
  query,
  slug,
  preview,
  sanityClient,
}: FetchPageProps) {
  let pageData: P | null = null;

  if (process.env.NODE_ENV === "development" && !preview) {
    pageData = await sanityClient.fetch<P>(query, {
      slug,
    });
  }

  if (process.env.NODE_ENV === "production") {
    pageData = await sanityClient.fetch<P>(query, {
      slug,
    });
  }

  return pageData;
}

type fetchStaticPropsProps = {
  params?: FetchStaticPathsParams;
  preview?: boolean;
  sanityClient: SanityClient;
};

export interface PageResult
  extends Omit<Page, "content">,
    PageQueryResult,
    SiteSettingResult,
    FooterQueryResult {}

export type FetchStaticPropsResult = {
  page: PageResult | null;
};

export const fetchStaticProps = async (
  props: fetchStaticPropsProps
): Promise<{ props: FetchStaticPropsResult }> => {
  const { params, sanityClient } = props;
  if (!props) {
    throw new Error("No props in fetchStaticProps.js");
  }
  if (!params) {
    throw new Error("No params in getStaticProps");
  }

  const slug = params && params.slug && params.slug[params.slug.length - 1];

  const filter = slug
    ? `_type == "page" && slug.current == "${slug}"`
    : `_id == *[_id == 'siteConfig'][0].indexPage._ref`;

  const page = await fetchPage<PageResult>({
    query: `*[${filter}][0]{
      ...,
      ${body},  
      ${siteQuery},
      ${footerQuery}
    }`,
    slug: slug || "",
    sanityClient,
  });
  return {
    props: { page },
  };
};

export {};
