/* eslint-disable import/no-unused-modules */
import appConfig from "../app.config.json";
import { sanityClient as client } from "@services/SanityService/sanity.server";
import { HeroBlogResult } from "PageBuilder/Blocks/hero/hero.query";

import { Hero, Section, Listing } from "components";

import { SectionBlockResult } from "PageBuilder/Blocks/sectionBlock/SectionBlockQuery";

import { NavigationResult } from "PageBuilder/Navigation/navigation.query";

import { FooterQueryResult } from "PageBuilder/Layout/Footer/Footer.query";
import { ListingBlockResult } from "PageBuilder/Blocks/listingBlock/listingBlock.query";

import fetchStaticProps from "lib/SanityPageBuilder/lib/fetchStaticProps/fetchStaticProps";

import BodyParser from "lib/SanityPageBuilder/lib/BodyParser/BodyParser";
import { fetchStaticPaths } from "lib/SanityPageBuilder/lib/fetchStaticPaths";
import { appQueryResult } from "PageBuilder/AppContext/appQuery";
import ReusableBlock from "PageBuilder/Blocks/reuseableBlock/frontend/ReuseableBlock";

import { pageQuery } from "PageBuilder/ContentTypes/Page/page.query";

import TrustBlock from "PageBuilder/Blocks/trustBlock/frontend/TrustBlock";
import { useAppContext } from "PageBuilder/AppContext/AppContext";
import { GetStaticPaths, GetStaticProps } from "next";

const locales = appConfig.locales;

interface PageData extends NavigationResult, appQueryResult, FooterQueryResult {
  content: (
    | SectionBlockResult
    | ListingBlockResult
    | HeroBlogResult
    | BlaResult
  )[];
  title?: string;
}

type BlaProps = { a: string; bc: number };

const Bla: React.FC<BlaProps> = (props) => {
  return <div></div>;
};

type BlaResult = {
  _type: "bla";
  a?: 6666;
  b?: 66;
};

const Page = () => {
  const { data } = useAppContext();
  return (
    <BodyParser
      content={data?.content || []}
      components={{
        // // hero: {
        // //   component: Hero,
        // // },
        //@ts-ignore
        hero: { component: Hero },
        section: {
          //@ts-ignore
          component: Section,
        },
        listing: {
          //@ts-ignore
          component: Listing,
        },
        //@ts-ignore
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

export const getStaticPaths: GetStaticPaths = async () => {
  return await fetchStaticPaths({
    client,
    doc: "page",
    locales,
  });
};

export const getStaticProps: GetStaticProps = async (props) => {
  const { params, preview, locale } = props;

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
