import Button, { IconButton } from "components/Button/Button";

describe("Button", () => {
  it("should render Button", () => {
    cy.mount(<Button>Button</Button>);
  });

  it.only("should render IconButton", () => {
    cy.mount(<IconButton icon="bell" />);
  });
});
