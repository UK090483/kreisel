import { render, screen } from "@testing-library/react";

import { FC } from "react";
import { NavigationContextProvider } from "../../NavigationContext";

import NavigationItem, { NavItemProps } from "./NavigationItem";
import { NavItemBaseProps } from "./NavigationItemBase";
import { NavigationLinkProps } from "./NavigationLink";

jest.mock("next/router", () => ({
  useRouter: () => ({
    asPath: "/",
  }),
}));

const TestNavigationItemBase: FC<NavItemBaseProps> = ({ children }) => {
  return <div data-testid="customBase">{children}</div>;
};

const TestNavigationLink: FC<NavigationLinkProps> = ({ children, href }) => {
  return (
    <a data-testid="customLink" href={href || ""}>
      {children}
    </a>
  );
};

const customRender = ({ itemProps }: { itemProps?: NavItemProps }) => {
  return render(
    <NavigationContextProvider>
      <NavigationItem {...itemProps} />
    </NavigationContextProvider>
  );
};

describe("NavigationItem", () => {
  it("smoke  ", () => {
    customRender({});
  });
  it("should render Label", () => {
    customRender({ itemProps: { label: "testLabel" } });
    expect(screen.getAllByText("testLabel"));
  });

  it("should render Link", () => {
    customRender({
      itemProps: { label: "testLabel", link: { href: "/testLink" } },
    });
    expect(screen.getByRole("link").getAttribute("href")).toBe("/testLink");
  });

  it("should render Custom Component", () => {
    customRender({
      itemProps: {
        label: "testLabel",
        link: { href: "/testLink" },
        NavigationItemBase: TestNavigationItemBase,
        NavigationLink: TestNavigationLink,
      },
    });
    expect(screen.getByTestId("customBase"));
    expect(screen.getByTestId("customLink"));
    expect(screen.getByText("testLabel"));
    expect(screen.getByRole("link").getAttribute("href")).toBe("/testLink");
  });
});
