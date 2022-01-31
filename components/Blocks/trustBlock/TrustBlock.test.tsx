import { mockClient } from "@privateModules/SanityPageBuilder/lib/MockClient";
import TustBlock from "./TustBlock";
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

describe("TustBlock", () => {
  it("should render", () => {
    render(<TustBlock _type="hero" _key="test" lang="de" />);
  });
});
