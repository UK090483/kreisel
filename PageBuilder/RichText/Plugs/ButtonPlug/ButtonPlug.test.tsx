import { fireEvent, render, screen } from "@testing-library/react";
import React, { ReactElement } from "react";
import ButtonPlug from "./ButtonPlug";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

const customRender = ({
  href,
  external,
}: {
  href?: string;
  external?: boolean;
}) => {
  render(
    <ButtonPlug
      node={{ label: "test", _type: "button", link: { href, external } }}
    />
  );
};

describe("Button", () => {
  it("should render correctly as Button ", () => {
    customRender({});
    expect(screen.getByRole("link")).toHaveTextContent("test");
  });

  it("should handle click as Link", () => {
    customRender({ href: "/test" });
    expect(screen.getByRole("link")).toHaveTextContent("test");
    expect(screen.getByRole("link")).toHaveAttribute("href", "/test");
  });
});
