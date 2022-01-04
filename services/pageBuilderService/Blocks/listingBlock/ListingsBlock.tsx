import List from "@components/organisms/Listings/List";
import React from "react";

import { AppLocations, Article, Listing as ListingType } from "types";

const cardQuery = `
...,
'date': _createdAt,
'href': select(
  defined(pageType) && defined(slug) => '/' + pageType->slug.current + '/' + slug.current,
  defined(slug) => '/' + slug.current
),
`;
export interface CardResult extends Article {
  href?: string;
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

export interface ListingBlockResult extends ListingType {
  _type: "listing";
  _key: string;
  items: CardResult[];
  lang: AppLocations;
}
const ListingBlock: React.FC<ListingBlockResult> = (props) => {
  const { items } = props;
  return <List items={items} />;
};

export default ListingBlock;
