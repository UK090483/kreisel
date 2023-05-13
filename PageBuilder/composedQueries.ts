import { appQueryResult, appQuery } from "./AppContext/appQuery";
import { HeroBlogResult, heroBlockQuery } from "./Blocks/hero/hero.query";
import {
  ListingBlockResult,
  listingBlockQuery,
} from "./Blocks/listingBlock/listingBlock.query";
import { reusableBlockQuery } from "./Blocks/reuseableBlock/ReusableBlock.query";
import {
  sectionBlockQuery,
  SectionBlockResult,
} from "./Blocks/sectionBlock/SectionBlockQuery";
import {
  trustBlockQuery,
  trustQueryResult,
} from "./Blocks/trustBlock/trustBlock.query";
import { footerQuery, FooterQueryResult } from "./Layout/Footer/Footer.query";
import {
  NavigationResult,
  NavigationQuery,
} from "./Navigation/navigation.query";

const contentQuery = `content[]{${heroBlockQuery},${sectionBlockQuery},${listingBlockQuery},${trustBlockQuery},${reusableBlockQuery}}`;

export type ContentResult = (
  | SectionBlockResult
  | ListingBlockResult
  | HeroBlogResult
  | trustQueryResult
)[];

export const pageQuery = `${contentQuery}, ${appQuery(
  ""
)}, ${footerQuery}, ${NavigationQuery("")}`;

export interface PageData
  extends NavigationResult,
    appQueryResult,
    FooterQueryResult {
  content: ContentResult;
  title?: string;
}
