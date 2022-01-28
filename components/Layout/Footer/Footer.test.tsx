/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

const testItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

describe("Footer", () => {
  it(" should render Nav items ", () => {
    // render(<Footer data={{ navigation: testItems }} />);
    // expect(screen.getByTestId("footer")).toHaveTextContent("Home");
    // expect(screen.getByTestId("footer")).toHaveTextContent("About");
    // expect(screen.getByTestId("footer")).toHaveTextContent("Contact");
    // expect(screen.getByTestId("footer")).toHaveTextContent("Impressum");
    // expect(screen.getByTestId("footer")).toHaveTextContent("Datenschutz");
  });
});
