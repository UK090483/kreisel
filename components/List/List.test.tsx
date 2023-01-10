import List from "./List";
import { render } from "@testing-library/react";


const TestOverlay = () => <div data-testid="testOverlay"></div>;

const useRouter = jest.spyOn(require("next/router"), "useRouter");

const customRender = (props?: { query: { [k: string]: string } }) => {
  useRouter.mockImplementation(() => ({
    query: { slug: "testSlug", ...props?.query },
  }));
  render(
    <List name="test" overlay={() => <TestOverlay />}>
      <div data-testid="testList">Test</div>
    </List>
  );
};

describe("List", () => {
  it("should render list ", () => {
    // customRender();
    // expect(screen.getByTestId("testList")).toBeVisible();
    // expect(screen.queryByTestId("testOverlay")).toBeNull();
  });

  // it("should render overlay if slug is Set ", () => {
  //   customRender({ query: { test: "testId" } });
  //   expect(screen.getByTestId("testList")).toBeVisible();
  //   expect(screen.getByTestId("testOverlay")).toBeVisible();
  // });
});
