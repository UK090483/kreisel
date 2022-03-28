import { render, screen } from "@testing-library/react";

import NavigationLink from "./NavigationLink";

describe("NavigationLink", () => {
  it("smoke  ", () => {
    render(<NavigationLink />);
  });
});
