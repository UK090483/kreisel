import { fireEvent, render, screen } from "@testing-library/react";
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
    expect(screen.getByRole("button")).toHaveTextContent("test");
  });

  it("should handle click as Link", () => {
    const routerPush = jest.fn();
    useRouter.mockImplementationOnce(() => ({
      query: { product: "coffee" },
      push: routerPush,
    }));
    customRender({ href: "/test" });
    expect(screen.getByRole("link")).toHaveTextContent("test");
    expect(screen.getByRole("link")).toHaveAttribute("href", "/test");
    fireEvent.click(screen.getByText("test"));
    expect(routerPush).toBeCalledTimes(1);
  });
});
