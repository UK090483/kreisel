import fetchPageData from "./fetchPageData";
import BodyParser from "@lib/SanityPageBuilder/lib/BodyParser/BodyParser";
import HeroBlock from "PageBuilder/Blocks/hero/frontend/HeroBlock";
import ListingBlock from "PageBuilder/Blocks/listingBlock/frontend/ListingsBlock";
import ReusableBlock from "PageBuilder/Blocks/reuseableBlock/frontend/ReuseableBlock";
import SectionBlock from "PageBuilder/Blocks/sectionBlock/frontend/SectionBlock";
import TrustBlock from "PageBuilder/Blocks/trustBlock/frontend/TrustBlock";

import React from "react";

type Props = {
  params: { slug?: string[] };
};

const Page = async (props: Props) => {
  const slug = props.params?.slug
    ? props.params?.slug[props.params.slug.length - 1]
    : "home";

  const pageData = await fetchPageData(slug);

  return (
    <BodyParser
      content={pageData.content}
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
export default Page;
