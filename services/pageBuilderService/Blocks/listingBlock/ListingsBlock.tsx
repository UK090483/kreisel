import List from "@components/organisms/Listings/List";
import React from "react";
import { AppLocations, Listing as ListingType } from "types";

export const listingBlockQuery = `
_type == "listing" => {
  _type,
 _key,
  'items': *[ _type == ^.contentType ][]{
    ...
  }
}
`;

export interface ListingBlogResult extends ListingType {
  _type: "listing";
  _key: string;
  items: any[];
}

export interface ListingBlockProps extends ListingBlogResult {
  lang: AppLocations;
}

const ListingBlock: React.FC<ListingBlockProps> = (props) => {
  const { items } = props;

  return (
    <div>
      <List />
      {/* {items.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ProjectCard key={index} {...item} />
      ))} */}
    </div>
  );
};

export default ListingBlock;

export {};
