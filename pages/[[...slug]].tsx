import appConfig from "../app.config.json";
import { sanityClient as client } from "@services/SanityService/sanity.server";
import {
  heroBlockQuery,
  HeroBlogResult,
} from "PageBuilder/Blocks/hero/hero.query";

import HeroBlock from "PageBuilder/Blocks/hero/frontend/HeroBlock";

import SectionBlock from "PageBuilder/Blocks/sectionBlock/SectionBlock";
import {
  SectionBlockResult,
  sectionBlockQuery,
} from "PageBuilder/Blocks/sectionBlock/SectionBlockQuery";

import { NavigationResult } from "PageBuilder/Navigation/query";
import TrustBlock, {
  trustBlockQuery,
} from "PageBuilder/Blocks/trustBlock/TrustBlock";
import { FooterQueryResult } from "components/Layout/Footer/Footer";
import {
  ListingBlockProps,
  listingBlockQuery,
} from "PageBuilder/Blocks/listingBlock/listingBlockQuery";
import ListingBlock from "PageBuilder/Blocks/listingBlock/ListingsBlock";

import fetchStaticProps from "lib/SanityPageBuilder/lib/fetchStaticProps/fetchStaticProps";

import { useMemberPage } from "PageBuilder/AppContext/AppContext";
import BodyParser from "lib/SanityPageBuilder/lib/BodyParser/BodyParser";
import { fetchStaticPaths } from "lib/SanityPageBuilder/lib/fetchStaticPaths";
import { appQueryResult } from "PageBuilder/AppContext/appQuery";
import ReusableBlock from "PageBuilder/Blocks/reuseableBlock/ReuseableBlock";
import Kreisel from "components/Kreisel";
import { pageQuery } from "PageBuilder/ContentTypes/Page/page.query";
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
  const { showSpinner } = useMemberPage();

  if (showSpinner) {
    return (
      <div className=" w-full px-28 h-screen ">
        <Kreisel className="max-w-sm "></Kreisel>
      </div>
    );
  }

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
    previewQuery: `content[]{${heroBlockQuery},${sectionBlockQuery}, ${listingBlockQuery},${trustBlockQuery}}`,
    query: pageQuery,
    locales,
    preview,
  });
};

export default Page;
