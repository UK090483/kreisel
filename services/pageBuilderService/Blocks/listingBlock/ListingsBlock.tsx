import List from "@components/organisms/Listings/List";
import TestimonialList from "@components/organisms/Listings/testimonials/TestimonialList";
import TherapistList from "@components/organisms/Listings/therapist/TherapistList";
import {
  imageMeta,
  ImageMetaResult,
} from "@services/pageBuilderService/queries/snippets";
import React from "react";

import { AppLocales, Article, Listing as ListingType, Therapist } from "types";

const cardQuery = `
...,
'image':image{...,${imageMeta}},
'date': _createdAt,
'href': select(
  defined(pageType) && defined(slug) => '/' + pageType->slug.current + '/' + slug.current,
  defined(slug) => '/' + slug.current
),
`;
export interface CardResult extends Article {
  href?: string;
}

export interface TherapistResult extends Omit<Therapist, "image"> {
  image?: ImageMetaResult;
}

export const listingBlockQuery = `
_type == "listing" => {
    ...,
  'items': select(
    contentType == 'testimonial' => *[_type == 'testimonial'][]{${cardQuery}},
    contentType == 'block' => *[_type == 'block'][]{${cardQuery}},
    contentType == 'article' => *[_type == 'article'][]{${cardQuery}},
    contentType == 'therapist' => *[_type == 'therapist'][]{${cardQuery}},
    type != 'custom' =>  *[ pageType->slug.current == ^.contentType ][]{${cardQuery}},
    type == 'custom' => customItems[]->{${cardQuery}}
  )
}
`;

export type ListingBlockItem = Article;

export interface ListingBlockResult extends Omit<ListingType, "contentType"> {
  _key: string;
  contentType: "article";
  items: CardResult[];
  lang: AppLocales;
}
export interface ListingBlockTherapistResult
  extends Omit<ListingType, "contentType"> {
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
