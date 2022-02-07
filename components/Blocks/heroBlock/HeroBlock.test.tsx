import { mockClient } from "@lib/SanityPageBuilder/lib/MockClient";
import HeroBlock, { heroBlockQuery } from "./HeroBlock";
import { render } from "@testing-library/react";
import React from "react";

const TestUnderline: React.FC = ({ children }) => {
  return <div>{children}</div>;
};
jest.mock("@components/Underline", () => {
  return {
    __esModule: true,
    default: TestUnderline,
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
    render(<HeroBlock _type="hero" _key="test" lang="de" />);
  });
});
