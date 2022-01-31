import { mockClient } from "@privateModules/SanityPageBuilder/lib/MockClient";
import { sectionBlockQuery } from "./SectionBlock";

jest.mock("@privateModules/SanityImage", () => ({}));

const database: any[] = [];

describe("SectionBlock", () => {
  it("query should be valid ", async () => {
    const client = mockClient({ database });
    await client.fetch(`*[_type == "page"]{
      'content':content[]{
        ${sectionBlockQuery}
      }

    }`);
  });
});
