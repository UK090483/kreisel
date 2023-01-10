import Button from "./Button";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Button", () => {
  it("should render correctly as Button ", () => {
    render(<Button>test</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("test");
  });
  it("should handle click as Button", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>test</Button>);
    fireEvent.click(screen.getByText("test"));
    expect(handleClick).toBeCalledTimes(1);
  });
  it("should handle click as Link", () => {
    render(<Button href="/test">test</Button>);

    expect(screen.getByRole("link")).toHaveTextContent("test");
    expect(screen.getByRole("link")).toHaveAttribute("href", "/test");
    expect(screen.getByTestId("nextLink")).toBeInTheDocument();
  });
});
