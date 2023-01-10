import { heroBlockQuery } from "../hero.query";
import { mockClient } from "lib/SanityPageBuilder/lib/MockClient";

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

  it("should render", () => {
    //  render(<HeroBlock _type="hero" _key="test" content={[]} />);
  });
});
