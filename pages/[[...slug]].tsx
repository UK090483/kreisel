import { sanityClient as client } from "@services/SanityService/sanity.server";
import conf from "app.config.json";
import SPB from "privateModules/SanityPageBuilder/SPB";
import HeroBlock, {
  heroBlockQuery,
  HeroBlogResult,
} from "@components/Blocks/heroBlock/HeroBlock";
import ListingBlock, {
  ListingBlockProps,
  listingBlockQuery,
  ListingBlockResult,
} from "@components/Blocks/listingBlock/ListingsBlock";
import onPageNav, {
  onPageNavBlockQuery,
} from "@components/Blocks/onPageNav/OnPageNav";
import SectionBlock, {
  sectionBlockQuery,
  SectionBlockResult,
} from "@components/Blocks/sectionBlock/SectionBlock";
import {
  NavigationQuery,
  NavigationResult,
} from "privateModules/Navigation/query";

export interface PageData extends NavigationResult {
  content: (SectionBlockResult | ListingBlockProps | HeroBlogResult)[];
  title?: string;
}

const { getStaticPaths, getStaticProps, PageComponent } = SPB<PageData>({
  revalidate: 1,
  client,
  locales: conf.locales,
  query: `${NavigationQuery()}, title`,

  components: [
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
