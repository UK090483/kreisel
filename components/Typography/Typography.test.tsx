/**
 * @jest-environment jsdom
 */
import Typo from "./Typography";
import { render, screen } from "@testing-library/react";


const variants = {
  h1: "H1",
  h3: "H3",
  h2: "H2",
  h4: "H4",
  h5: "H5",
  h6: "H6",
  subheading1: "H6",
  subheading2: "H6",
  body1: "P",
  body2: "P",
};

const as = {
  h1: "H1",
  h3: "H3",
  h2: "H2",
  h4: "H4",
  h5: "H5",
  h6: "H6",
  span: "SPAN",
  p: "P",
};

describe("Typography", () => {
  it("should initial render p  ", () => {
    render(<Typo>test</Typo>);
    const p = screen.getByText("test");
    expect(p).toBeInTheDocument();
    expect(p.tagName).toBe("P");
  });

  test.each(Object.keys(as))("should render as %s", (variant) => {
    render(
      //@ts-ignore
      <Typo as={variant} variant="h1">
        test
      </Typo>
    );
    const p = screen.getByText("test");
    expect(p).toBeInTheDocument();
    //@ts-ignore
    expect(p.tagName).toBe(as[variant]);
  });
});
