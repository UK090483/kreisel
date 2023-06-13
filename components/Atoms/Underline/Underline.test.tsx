import Underline from "./Underline";
import { render } from "@testing-library/react";

const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock);

describe("underline", () => {
  it("should render", () => {
    render(<Underline>Test</Underline>);
  });
  it("should render + variant", () => {
    render(<Underline variant={0}>Test</Underline>);
  });
  it("should render + on", () => {
    render(<Underline on="hover">Test</Underline>);
    render(<Underline on="init">Test</Underline>);
  });
  it("should render + show", () => {
    render(<Underline show={false}>Test</Underline>);
  });
});
