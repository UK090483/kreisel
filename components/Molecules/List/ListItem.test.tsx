import ListItem from "./ListItem";
import { render, screen } from "@testing-library/react";


const TestOverlay = () => <div data-testid="testOverlay"></div>;

const useRouter = jest.spyOn(require("next/router"), "useRouter");

const customRender = (props?: { query: { [k: string]: string } }) => {
  useRouter.mockImplementation(() => ({
    query: { slug: "testSlug", ...props?.query },
  }));
  render(
    <ListItem name="test" id="testId" className="testClass">
      <div data-testid="testListItem">Test</div>
    </ListItem>
  );
};

describe("ListItem", () => {
  it("should render listItem ", () => {
    customRender();
    expect(screen.getByTestId("testListItem")).toBeVisible();
    expect(
      screen.getByTestId("listItemLink").classList.contains("testClass")
    ).toBeTruthy();
  });
});
