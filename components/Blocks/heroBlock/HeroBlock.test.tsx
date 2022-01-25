import { mockClient } from "@privateModules/SanityPageBuilder/lib/MockClient";
import { heroBlockQuery } from "./HeroBlock";

jest.mock("@privateModules/SanityImage", () => ({}));

const database: any[] = [];

describe("HeroBlock", () => {
  it("query should be valid ", async () => {
    const client = mockClient({ database });
    const res = await client.fetch(`*[_type == "page"]{
      'content':content[]{
        ${heroBlockQuery}
      }

    }`);
  });
});
