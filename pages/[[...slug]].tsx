import { sanityClient as client } from "@services/SanityService/sanity.server";
import HeroBlock, {
  heroBlockQuery,
  HeroBlogResult,
} from "@components/Blocks/heroBlock/HeroBlock";

import SectionBlock from "@components/Blocks/sectionBlock/SectionBlock";
import {
  SectionBlockResult,
  sectionBlockQuery,
} from "@components/Blocks/sectionBlock/SectionBlockQuery";

import { NavigationQuery, NavigationResult } from "@lib/Navigation/query";
import TrustBlock, {
  trustBlockQuery,
} from "@components/Blocks/trustBlock/TrustBlock";
import {
  footerQuery,
  FooterQueryResult,
} from "@components/Layout/Footer/Footer";
import {
  ListingBlockProps,
  listingBlockQuery,
} from "@components/Blocks/listingBlock/listingBlockQuery";
import ListingBlock from "@components/Blocks/listingBlock/ListingsBlock";

import fetchStaticProps from "@lib/SanityPageBuilder/lib/fetchStaticProps/fetchStaticProps";

import { GetStaticPaths, GetStaticProps } from "next";
import appConfig from "../app.config.json";
import {
  useAppContext,
  useMemberPage,
} from "@components/AppContext/AppContext";
import BodyParser from "@lib/SanityPageBuilder/lib/BodyParser/BodyParser";
import { fetchStaticPaths } from "@lib/SanityPageBuilder/lib/fetchStaticPaths";
import appQuery, { appQueryResult } from "@components/AppContext/appQuery";
const locales = appConfig.locales;

export interface PageData
  extends NavigationResult,
    appQueryResult,
    FooterQueryResult {
  content: (SectionBlockResult | ListingBlockProps | HeroBlogResult)[];
  title?: string;
}

const Page = () => {
  const { data } = useAppContext();

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
      }}
      content={data?.content || []}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return await fetchStaticPaths({
    client,
    doc: "page",
    locales,
  });
};

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
    query: `content[]{${heroBlockQuery},${sectionBlockQuery},${listingBlockQuery},${trustBlockQuery} },  ${footerQuery}, ${appQuery(
      ""
    )}, ${NavigationQuery("", isMember ? "memberNav" : undefined)}`,
    locales,
    preview,
  });
};

export default Page;
