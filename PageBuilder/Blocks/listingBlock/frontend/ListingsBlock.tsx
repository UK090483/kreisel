import { ListingBlockResult } from "../listingBlock.query";
import { Listing } from "components";
import React from "react";

const ListingBlock: React.FC<ListingBlockResult> = (props) => {
  return <Listing {...props} />;
};

export default ListingBlock;
