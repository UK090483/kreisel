import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";
const useRouter = jest.spyOn(require("next/router"), "useRouter");

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
    const routerPush = jest.fn();
    useRouter.mockImplementationOnce(() => ({
      query: { product: "coffee" },
      push: routerPush,
    }));
    const handleClick = jest.fn();
    render(
      <Button href="/test" onClick={handleClick}>
        test
      </Button>
    );
    expect(screen.getByRole("link")).toHaveTextContent("test");
    expect(screen.getByRole("link")).toHaveAttribute("href", "/test");
    fireEvent.click(screen.getByText("test"));
    expect(handleClick).toBeCalledTimes(1);
    expect(routerPush).toBeCalledTimes(1);
  });
});
