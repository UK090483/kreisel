import { sectionBlockQuery } from "../SectionBlockQuery";
import { mockClient } from "@services/SanityService/test/testClient";

jest.mock("lib/SanityImage", () => ({}));

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
