import { sanityClient as client } from "@services/SanityService/sanity.server";

import conf from "app.config.json";
import SPB from "Modules/SanityPageBuilder/SPB";
import HeroBlock, {
  heroBlockQuery,
  HeroBlogResult,
} from "@services/pageBuilderService/Blocks/heroBlock/HeroBlock";
import ListingBlock, {
  listingBlockQuery,
  ListingBlockResult,
} from "@services/pageBuilderService/Blocks/listingBlock/ListingsBlock";
import onPageNav, {
  onPageNavBlockQuery,
} from "@services/pageBuilderService/Blocks/onPageNav/OnPageNav";
import SectionBlock, {
  sectionBlockQuery,
  SectionBlockResult,
} from "@services/pageBuilderService/Blocks/sectionBlock/SectionBlock";
import { NavigationQuery, NavigationResult } from "Modules/Navigation/query";

export interface PageData extends NavigationResult {
  content: (SectionBlockResult | ListingBlockResult | HeroBlogResult)[];
  title?: string;
}

const { getStaticPaths, getStaticProps, PageComponent } = SPB<PageData>({
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
