import { mockClient } from "@privateModules/SanityPageBuilder/lib/MockClient";
import { listingBlockQuery } from "./ListingsBlock";

jest.mock("@components/Image", () => ({
  Image: () => {},
}));

describe("ListingBlock", () => {
  it("type click should render ", async () => {
    const client = mockClient();

    const res = await client.fetch(listingBlockQuery);
  });
});
