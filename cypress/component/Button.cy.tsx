import Button, { IconButton } from "components/Atoms/Button/Button";

describe("<Button>", () => {
  it("should render Button", () => {
    cy.mount(<Button>Button</Button>);
    cy.get(`button[type="button"]`).should("have.text", "Button");
  });

  it("Button should handle click", () => {
    cy.mount(<Button onClick={cy.spy().as("onClickHandler")}>Button</Button>);
    cy.get("button").click();
    cy.get("@onClickHandler").should("have.been.calledOnce");
  });

  it("should render as internal Link", () => {
    cy.mountWithContext(<Button href="/test">Link</Button>, {});
    cy.get(`a[href="/test"]`).click();
    cy.get("@push").should(
      "have.been.calledOnceWith",
      "/test",
      "/test",
      Cypress.sinon.match.object
    );
  });

  it("should render as external Link", () => {
    cy.mountWithContext(
      <Button external href="/test">
        Link
      </Button>,
      {}
    );
    cy.get(`a[href="/test"]`).invoke("attr", "target").should("eq", "_blank");
    cy.get(`a[href="/test"]`).invoke("attr", "rel").should("eq", "noreferrer");
  });
});

describe("<IconButton/>", () => {
  it("should render Button", () => {
    cy.mount(<IconButton icon="hamburger" />);
    cy.get(`button[type="button"]`);
    cy.get(`svg`);
  });

  it("Button should handle click", () => {
    cy.mount(
      <IconButton onClick={cy.spy().as("onClickHandler")} icon="hamburger" />
    );
    cy.get("button").click();
    cy.get("@onClickHandler").should("have.been.calledOnce");
  });
});
