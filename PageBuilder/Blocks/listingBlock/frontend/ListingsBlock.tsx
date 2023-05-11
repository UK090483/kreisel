import { ListingBlockProps } from "../listingBlock.query";
import { Listing } from "components";
import React from "react";

const ListingBlock: React.FC<ListingBlockProps> = (props) => {
  //@ts-ignore
  return <Listing {...props} />;
};

export default ListingBlock;
