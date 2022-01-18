import List from "@components/organisms/Listings/List";
import TestimonialList from "@components/organisms/Listings/testimonials/TestimonialList";
import TherapistList from "@components/organisms/Listings/therapist/TherapistList";
import {
  imageMeta,
  ImageMetaResult,
} from "@services/pageBuilderService/queries/snippets";
import React from "react";

import { AppLocales } from "types";

const cardQuery = `
...,
'image':image{...,${imageMeta}},
'date': _createdAt,
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
  _id: string;
}

export interface IArticleCardResult extends CardResult {
  _type: "article";
  price?: number;
}

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

export const listingBlockQuery = `
_type == "listing" => {
    ...,
  'items': select(
    contentType == 'article' => *[_type == 'article'][]{${cardQuery}},
    contentType == 'blog' => *[_type == 'blog'][]{${cardQuery}},
    contentType == 'testimonial' => *[_type == 'testimonial'][]{${cardQuery}},
    contentType == 'therapist' => *[_type == 'therapist'][]{${cardQuery}},
    type != 'custom' =>  *[ pageType->slug.current == ^.contentType ][]{${cardQuery}},
    type == 'custom' => customItems[]->{${cardQuery}}
  )
}
`;

export interface ListingBlockResult {
  _key: string;
  _type: "listing";
  type?: "contentType" | "custom";
  contentType?: "therapist" | "article" | "testimonial" | "blog";
  items: CardResult[];
  customItems?: CardResult[];
  lang: AppLocales;
}

export interface ListingBlockTherapistResult {
  _key: string;
  contentType: "therapist";
  items: TherapistResult[];
  lang: AppLocales;
}

export interface ITestimonialItem {
  text?: string | null;
  image?: ImageMetaResult;
  name?: string | null;
  position?: string | null;
  _id: string;
}

export interface ListingBlockTestimonialResult {
  _key: string;
  contentType: "testimonial";
  items: ITestimonialItem[];
  lang: AppLocales;
}

export type ListingBlockItem = IArticleCardResult | TherapistResult;

const ListingBlock: React.FC<
  | ListingBlockResult
  | ListingBlockTherapistResult
  | ListingBlockTestimonialResult
> = (props) => {
  const { items, contentType } = props;

  if (contentType === "testimonial") {
    //@ts-ignore
    return <TestimonialList items={items} />;
  }

  if (contentType === "therapist") {
    //@ts-ignore
    return <TherapistList items={items} />;
  }
  //@ts-ignore
  return <List items={items} />;
};

export default ListingBlock;
