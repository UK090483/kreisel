import { trustBlockQuery } from "./trustBlock.query";
import { mockClient } from "lib/SanityPageBuilder/lib/MockClient";

const database: any[] = [];

describe("TrustBlock", () => {
  it("query should be valid ", async () => {
    const client = mockClient({ database });
    const res = await client.fetch(`*[_type == "page"]{
          'content':content[]{
            ${trustBlockQuery}
          }
    
        }`);
  });
});
