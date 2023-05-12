import {
  footerQuery,
  FooterQueryResult,
} from "PageBuilder/Layout/Footer/Footer.query";
import {
  NavigationQuery,
  NavigationResult,
} from "PageBuilder/Navigation/navigation.query";
import appQuery, { appQueryResult } from "PageBuilder/AppContext/appQuery";
import {
  heroBlockQuery,
  HeroBlogResult,
} from "PageBuilder/Blocks/hero/hero.query";
import {
  ListingBlockResult,
  listingBlockQuery,
} from "PageBuilder/Blocks/listingBlock/listingBlock.query";
import { reusableBlockQuery } from "PageBuilder/Blocks/reuseableBlock/ReusableBlock.query";
import {
  sectionBlockQuery,
  SectionBlockResult,
} from "PageBuilder/Blocks/sectionBlock/SectionBlockQuery";
import { trustBlockQuery } from "PageBuilder/Blocks/trustBlock/trustBlock.query";

export const pageQuery = `content[]{${heroBlockQuery},${sectionBlockQuery},${listingBlockQuery},${trustBlockQuery},${reusableBlockQuery} }, ${footerQuery}, ${appQuery(
  ""
)}, ${NavigationQuery("")}`;

type BlaResult = {
  _type: "bla";
  a?: 6666;
  b?: 66;
};
export interface pageQueryResult
  extends NavigationResult,
    appQueryResult,
    FooterQueryResult {
  content: (SectionBlockResult | ListingBlockResult | HeroBlogResult)[];
  title?: string;
}
