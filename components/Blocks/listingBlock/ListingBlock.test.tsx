import { mockClient } from "@privateModules/SanityPageBuilder/lib/MockClient";
import { listingBlockQuery } from "./ListingsBlock";

jest.mock("@components/Image", () => ({
  Image: () => {},
}));

const database: any[] = [];

describe("ListingBlock", () => {
  it("type click should render ", async () => {
    const client = mockClient({ database });
    const res = await client.fetch(`*[_type == "page"]{
      'content':content[]{
        ${listingBlockQuery}
      }

    }`);
  });
});
