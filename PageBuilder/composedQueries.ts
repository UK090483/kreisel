/* eslint-disable import/no-unused-modules */
import { appQueryResult, appQuery } from "./AppContext/appQuery";
import { HeroBlogResult, heroBlockQuery } from "./Blocks/hero/hero.query";
import {
  ListingBlockResult,
  listingBlockQuery,
} from "./Blocks/listingBlock/listingBlock.query";
import {
  IReusableBlockResult,
  reusableBlockQuery,
} from "./Blocks/reuseableBlock/ReusableBlock.query";
import {
  sectionBlockQuery,
  SectionBlockResult,
} from "./Blocks/sectionBlock/SectionBlockQuery";
import {
  trustBlockQuery,
  trustQueryResult,
} from "./Blocks/trustBlock/trustBlock.query";
import {
  IFooterContact,
  IFooterInfo,
  footerContactQuery,
  footerInfoQuery,
  IFooterInfoItem,
  footerQuery,
  FooterQueryResult,
} from "./Layout/Footer/Footer.query";
import {
  NavigationResult,
  NavigationQuery,
  NavQuery,
  NavResult,
} from "./Navigation/navigation.query";

export const contentQuery = `content[]{${heroBlockQuery},${sectionBlockQuery},${listingBlockQuery},${trustBlockQuery},${reusableBlockQuery}}`;

export type ContentResult = {
  content: (
    | SectionBlockResult
    | ListingBlockResult
    | HeroBlogResult
    | trustQueryResult
    | IReusableBlockResult
  )[];
};

export const pageQuery = `${contentQuery}, ${appQuery}, ${footerQuery}, ${NavigationQuery}`;

export interface PageData
  extends NavigationResult,
    appQueryResult,
    FooterQueryResult {
  content: ContentResult;
  title?: string;
}

export {
  NavigationQuery,
  NavQuery,
  footerInfoQuery,
  footerContactQuery,
  footerQuery,
};

export type {
  NavigationResult,
  NavResult,
  IFooterInfo,
  IFooterContact,
  FooterQueryResult,
  IFooterInfoItem,
};
