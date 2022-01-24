import { mockClient } from "@privateModules/SanityPageBuilder/lib/MockClient";
import { sectionBlockQuery } from "./SectionBlock";

jest.mock("@components/Image", () => ({
  Image: () => {},
}));

const database: any[] = [];

describe("SectionBlock", () => {
  it("query should be valid ", async () => {
    const client = mockClient({ database });
    const res = await client.fetch(`*[_type == "page"]{
      'content':content[]{
        ${sectionBlockQuery}
      }

    }`);
  });
});
