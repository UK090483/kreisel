import { render, screen } from "@testing-library/react";
import List from "./List";

describe("List", () => {
  it("should render disc type ", () => {
    render(<List />);

    expect(
      screen.getByTestId("list").classList.contains("list-disc")
    ).toBeTruthy();
  });
  it("should render number Type", () => {
    render(<List type="number" />);

    expect(
      screen.getByTestId("list").classList.contains("list-decimal")
    ).toBeTruthy();
  });
});
