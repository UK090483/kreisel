import { imageMeta, ImageMetaResult } from "@lib/SanityImage/query";
import { AppLocales, AppColor } from "types";
import {
  personItemQuery,
  PersonItemResult,
} from "./Listings/Persons/PersonListQuery";

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
  image?: ImageMetaResult;
  name?: string | null;
  position?: string | null;
  _id: string;
  bgColor: AppColor;
  content: null | any;
}

export interface ListingBlockTestimonialResult {
  _key: string;
  contentType: "testimonial";
  items: ITestimonialItem[];
  lang: AppLocales;
  bgColor: AppColor;
}

export type ListingBlockItem = CardResult;

const cardQuery = `
...,
'content':null,
description,
_type,
_id,
_createdAt,
title,
'image':image{...,${imageMeta}},
'href': select(
  defined(pageType) && defined(slug) => '/' + pageType->slug.current + '/' + slug.current,
  defined(slug) => '/' + slug.current
),
`;

export interface CardResult {
  href?: string;
  title?: string;
  description?: string;
  image?: ImageMetaResult;
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
  variation,
  _type,
   _key,
   contentType,
  'content':  content[]{...},
  'items': select(
    contentType == 'custom' => customItems[]{
      _type == 'reference' => @->{${cardQuery}},
      _type != 'reference' => {${cardQuery}},
    },
    contentType == 'people' => peopleItems[]->{${personItemQuery("")}},
    contentType in ['article','testimonial','therapist']=> *[_type == ^.contentType ][]{${cardQuery}},
    contentType in ['blog','aktuelles']=> *[ pageType->slug.current == ^.contentType ][]{${cardQuery}}
  ),
}
`;

export interface ListingBlockResult<Type, Card> {
  _key: string;
  _type: "listing";
  type?: "contentType" | "custom";
  contentType: Type;
  items?: Card[];
  lang?: AppLocales;
  bgColor?: AppColor;
  content?: null | any;
  variation?: null | "list" | "grid";
}

export type ListingBlockProps =
  | ListingBlockResult<"people", PersonItemResult>
  | ListingBlockResult<"therapist", TherapistResult>
  | ListingBlockResult<"testimonial", ITestimonialItem>
  | ListingBlockResult<"blog" | "article", CardResult>;
