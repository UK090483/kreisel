import { mockClient } from "@privateModules/SanityPageBuilder/lib/MockClient";
import ListingBlock from "./ListingsBlock";
import { render } from "@testing-library/react";
import { listingBlockQuery } from "./listingBlockQuery";

jest.mock("@privateModules/SanityImage", () => ({}));
const database: any[] = [];

describe("ListingBlock", () => {
  it("query should be valid ", async () => {
    const client = mockClient({ database });
    const res = await client.fetch(`*[_type == "page"]{
      'content':content[]{
        ${listingBlockQuery}
      }
    }`);
  });
  it("should render ", async () => {
    render(
      <ListingBlock contentType="blog" _type="listing" _key="test" lang="de" />
    );
  });
});
