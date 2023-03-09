import ListingBlock from "PageBuilder/Blocks/listingBlock/frontend/ListingsBlock";

import {
  listingBlockQuery,
  ListingBlockProps,
} from "PageBuilder/Blocks/listingBlock/listingBlock.query";
const render = (
  props?: Partial<
    Parameters<typeof cy.mountPageBuilderComponent<ListingBlockProps>>[0]
  >
) => {
  cy.mountPageBuilderComponent<ListingBlockProps>({
    Component: ListingBlock,
    blockQuery: listingBlockQuery,

    ...props,
    blockData: {
      _type: "listing",
      ...props?.blockData,
    },
  });
};

describe("ListingBlock", () => {
  it("should Render", () => {
    // render();
  });
});
