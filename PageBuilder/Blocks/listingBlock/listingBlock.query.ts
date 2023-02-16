/* eslint-disable import/no-unused-modules */
import {
  personItemQuery,
  PersonItemResult,
} from "./frontend/Listings/Persons/PersonListQuery";

import buildQuery from "./listingBuilder/buildQuery";
import listingBlockItems from "./listingBlock.items";
import { linkQuery, LinkResult } from "PageBuilder/Navigation/navigation.query";

import { imageQuery, ImageResult } from "PageBuilder/Image/sanityImage.query";
import { AppLocales, AppColor } from "types";
import {
  BlockStyle,
  blockStyleProjection,
} from "PageBuilder/schemaHelper/blockStyle";

export interface TherapistResult extends CardResult {
  _type: "therapist";
  zipCode?: string;
  city?: string;
  name?: string;
  firstName?: string;
  degrees?: string;
  education?: string;
  website?: string;
  email?: string;
  jobDescription?: string;
}

export interface ITestimonialItem {
  text?: string | null;
  image?: ImageResult;
  name?: string | null;
  position?: string | null;
  _id: string;
  bgColor: AppColor;
  content: null | any;
}

interface ListingBlockTestimonialResult {
  _key: string;
  contentType: "testimonial";
  items: ITestimonialItem[];
  lang: AppLocales;
  bgColor: AppColor;
}

export type ListingBlockItem = CardResult;

const cardQuery = `
description,
_type,
_id,
title,
text,
name,
position,
'image':image{...,${imageQuery}},
'href': select(
  defined(pageType) && defined(slug) => '/' + pageType->slug.current + '/' + slug.current,
  defined(slug) => '/' + slug.current
),
'link':link{${linkQuery}},
`;

export interface CardResult {
  href?: string;
  title?: string;
  description?: string;
  image?: ImageResult;
  link?: LinkResult;
  _createdAt?: string;
  _id: string;
  _key?: string;
  _type?: string;
}

export interface IArticleCardResult extends CardResult {
  _type: "article";
  price?: number;
}

export const listingBlockQuery = `
_type == "listing" => {
  _type,
  _key,
  variation,
  'content':  content[]{...},
  ${buildQuery(
    listingBlockItems,
    `...select(_type == "reference" =>@->,@){
      ${cardQuery}
      _type == 'person'=>{${personItemQuery("")}}
    }`
  )}
  ${blockStyleProjection()}
}
`;

interface ListingBlockItemResult<Type, Card, Variant = undefined>
  extends BlockStyle {
  _key: string;
  _type: "listing";
  type?: "contentType" | "custom";
  contentType: Type;
  items?: Card[];
  content?: null | any;
  variation?: null | "list" | "grid";
  variant?: Variant;
}

export type ListingBlockProps =
  | ListingBlockItemResult<"page", CardResult, "card" | "smallCard">
  | ListingBlockItemResult<"people", PersonItemResult>
  | ListingBlockItemResult<"therapist", TherapistResult>
  | ListingBlockItemResult<"testimonial", ITestimonialItem>
  | ListingBlockItemResult<"blog" | "article", CardResult>
  | ListingBlockItemResult<"custom", CardResult>;
