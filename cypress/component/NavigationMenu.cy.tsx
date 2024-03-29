import HeaderNavigation from "components/Molecules/Navigation/New/Headless Ui/NavigationMenu";
import {
  linkItem,
  listItem,
} from "components/Molecules/Navigation/New/testData";

describe("<NavigationMenu/>", () => {
  it("should not render if no item & no Link", () => {
    cy.mount(<HeaderNavigation items={[linkItem({ link: {} })]} />);
    cy.contains(linkItem().label).should("not.exist");
  });

  it("should render as Link", () => {
    cy.mount(<HeaderNavigation items={[linkItem()]} />);
    cy.get(`a[href=${linkItem().link.href}]`)
      .should("be.visible")
      .should("have.text", linkItem().label);
  });

  it("should render as List", () => {
    cy.mount(<HeaderNavigation items={[listItem()]} />);

    cy.contains(listItem().label).as("listButton");

    cy.get(`a[href=${listItem().items[0].link.href}]`).should("not.exist");
    cy.get(`a[href=${listItem().items[1].link.href}]`).should("not.exist");

    cy.get("@listButton").realHover();

    cy.get(`a[href=${listItem().items[0].link.href}]`)
      .should("exist")
      .should("have.text", listItem().items[0].label);
    cy.get(`a[href=${listItem().items[1].link.href}]`)
      .should("exist")
      .should("have.text", listItem().items[1].label);
  });

  it("should render as Multi List", () => {});
});
