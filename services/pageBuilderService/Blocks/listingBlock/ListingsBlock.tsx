import List from "@components/organisms/Listings/List";
import TherapistList from "@components/organisms/Listings/therapist/TherapistList";
import {
  imageMeta,
  ImageMetaResult,
} from "@services/pageBuilderService/queries/snippets";
import React from "react";

import {
  AppLocations,
  Article,
  Listing as ListingType,
  Therapist,
} from "types";

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
    type != 'custom' =>  *[ _type == ^.contentType ][]{${cardQuery}},
    type == 'custom' => customItems[]->{${cardQuery}}
  )
}
`;

export type ListingBlockItem = Article;

export interface ListingBlockResult extends Omit<ListingType, "contentType"> {
  _key: string;
  contentType: "article";
  items: CardResult[];
  lang: AppLocations;
}
export interface ListingBlockTherapistResult
  extends Omit<ListingType, "contentType"> {
  _key: string;
  contentType: "therapist";
  items: TherapistResult[];
  lang: AppLocations;
}

const ListingBlock: React.FC<
  ListingBlockResult | ListingBlockTherapistResult
> = (props) => {
  const { items, contentType } = props;

  if (contentType === "therapist") {
    //@ts-ignore
    return <TherapistList items={items} />;
  }
  //@ts-ignore
  return <List items={items} />;
};

export default ListingBlock;
