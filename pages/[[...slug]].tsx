import appConfig from "../app.config.json";
import { sanityClient as client } from "@services/SanityService/sanity.server";
import { HeroBlogResult } from "PageBuilder/Blocks/hero/hero.query";

import HeroBlock from "PageBuilder/Blocks/hero/frontend/HeroBlock";

import SectionBlock from "PageBuilder/Blocks/sectionBlock/frontend/SectionBlock";
import { SectionBlockResult } from "PageBuilder/Blocks/sectionBlock/SectionBlockQuery";

import { NavigationResult } from "PageBuilder/Navigation/navigation.query";

import { FooterQueryResult } from "PageBuilder/Layout/Footer/Footer";
import { ListingBlockProps } from "PageBuilder/Blocks/listingBlock/listingBlock.query";

import fetchStaticProps from "lib/SanityPageBuilder/lib/fetchStaticProps/fetchStaticProps";

import BodyParser from "lib/SanityPageBuilder/lib/BodyParser/BodyParser";
import { fetchStaticPaths } from "lib/SanityPageBuilder/lib/fetchStaticPaths";
import { appQueryResult } from "PageBuilder/AppContext/appQuery";
import ReusableBlock from "PageBuilder/Blocks/reuseableBlock/frontend/ReuseableBlock";

import { pageQuery } from "PageBuilder/ContentTypes/Page/page.query";
import ListingBlock from "PageBuilder/Blocks/listingBlock/frontend/ListingsBlock";
import TrustBlock from "PageBuilder/Blocks/trustBlock/frontend/TrustBlock";
import { GetStaticPaths, GetStaticProps } from "next";
const locales = appConfig.locales;

export interface PageData
  extends NavigationResult,
    appQueryResult,
    FooterQueryResult {
  content: (SectionBlockResult | ListingBlockProps | HeroBlogResult)[];
  title?: string;
}

const Page = () => {
  return (
    <BodyParser
      components={{
        hero: {
          component: HeroBlock,
        },
        section: {
          component: SectionBlock,
        },
        listing: {
          component: ListingBlock,
        },
        trust: {
          component: TrustBlock,
        },
        reusable: {
          component: ReusableBlock,
        },
      }}
    />
  );
};

// eslint-disable-next-line import/no-unused-modules
export const getStaticPaths: GetStaticPaths = async () => {
  return await fetchStaticPaths({
    client,
    doc: "page",
    locales,
  });
};

// eslint-disable-next-line import/no-unused-modules
export const getStaticProps: GetStaticProps = async (props) => {
  const { params, preview, locale } = props;
  const isMember =
    params &&
    params.slug &&
    Array.isArray(params.slug) &&
    params.slug[0] === "mitgliederbereich";

  return await fetchStaticProps<PageData>({
    locale,
    revalidate: true,
    params,
    client,
    previewQuery: pageQuery,
    query: pageQuery,
    locales,
    preview,
  });
};

export default Page;
