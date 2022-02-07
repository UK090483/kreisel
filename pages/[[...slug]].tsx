import { sanityClient as client } from "@services/SanityService/sanity.server";
import conf from "app.config.json";
import SPB from "@lib/SanityPageBuilder/SPB";
import HeroBlock, {
  heroBlockQuery,
  HeroBlogResult,
} from "@components/Blocks/heroBlock/HeroBlock";

import onPageNav, {
  onPageNavBlockQuery,
} from "@components/Blocks/onPageNav/OnPageNav";
import SectionBlock, {
  sectionBlockQuery,
  SectionBlockResult,
} from "@components/Blocks/sectionBlock/SectionBlock";
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

export interface PageData extends NavigationResult, FooterQueryResult {
  content: (SectionBlockResult | ListingBlockProps | HeroBlogResult)[];
  title?: string;
}

const { getStaticPaths, getStaticProps, PageComponent } = SPB<PageData>({
  revalidate: 1,
  client,
  locales: conf.locales,
  getQuery: (props) => {
    const isMember =
      props?.params?.slug && props?.params?.slug[0] === "mitgliederbereich";
    return `${footerQuery}, ${NavigationQuery(
      "",
      isMember ? "memberNav" : undefined
    )}, title`;
  },
  components: [
    {
      name: "trust",
      component: TrustBlock,
      query: trustBlockQuery,
    },
    {
      name: "hero",
      component: HeroBlock,
      query: heroBlockQuery,
    },
    {
      name: "section",
      component: SectionBlock,
      query: sectionBlockQuery,
    },
    {
      name: "listing",
      component: ListingBlock,
      query: listingBlockQuery,
    },
    {
      name: "onPageNav",
      component: onPageNav,
      query: onPageNavBlockQuery,
    },
  ],
});

export { getStaticPaths, getStaticProps };

export default PageComponent;
