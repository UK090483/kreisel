import {
  footerQuery,
  FooterQueryResult,
} from "@components/Layout/Footer/Footer";
import {
  NavigationQuery,
  NavigationResult,
} from "PageBuilder/Navigation/query";
import appQuery, { appQueryResult } from "PageBuilder/AppContext/appQuery";
import {
  heroBlockQuery,
  HeroBlogResult,
} from "PageBuilder/Blocks/hero/hero.query";
import {
  ListingBlockProps,
  listingBlockQuery,
} from "PageBuilder/Blocks/listingBlock/listingBlockQuery";
import { reusableBlockQuery } from "PageBuilder/Blocks/reuseableBlock/ReusableBlock.query";
import {
  sectionBlockQuery,
  SectionBlockResult,
} from "PageBuilder/Blocks/sectionBlock/SectionBlockQuery";
import { trustBlockQuery } from "PageBuilder/Blocks/trustBlock/TrustBlock";

export const pageQuery = `content[]{${heroBlockQuery},${sectionBlockQuery},${listingBlockQuery},${trustBlockQuery},${reusableBlockQuery} },  ${footerQuery}, ${appQuery(
  ""
)}, ${NavigationQuery("")}`;

export interface pageQueryResult
  extends NavigationResult,
    appQueryResult,
    FooterQueryResult {
  content: (SectionBlockResult | ListingBlockProps | HeroBlogResult)[];
  title?: string;
}
