import { mockClient } from "@lib/SanityPageBuilder/lib/MockClient";

import React from "react";
import { heroBlockQuery } from "../hero.query";

jest.mock("@components/Underline/Underline", () => {
  return {
    __esModule: true,
    //@ts-ignore
    default: ({ children }) => {
      return <div>{children}</div>;
    },
  };
});

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
