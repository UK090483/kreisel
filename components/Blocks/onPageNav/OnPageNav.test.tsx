import { mockClient } from "@lib/SanityPageBuilder/lib/MockClient";

import { render, screen } from "@testing-library/react";
import OnPageNavComponent from "./OnPageNav";

const testItems = describe("OnPageNav", () => {
  it("should render ", async () => {
    render(
      <OnPageNavComponent
        _type="onPageNav"
        items={[
          {
            _type: "onPageNavItem",
            _key: "nr1",
            title: "testItem1",
            link: "testItem1",
          },
          {
            _type: "onPageNavItem",
            _key: "nr2",
            title: "testItem2",
            link: "testItem2",
          },
        ]}
      />
    );

    expect(screen.getByText("testItem1")).toBeVisible();
    expect(screen.getByText("testItem2")).toBeVisible();
  });
});
