///<reference path="../support/component.tsx" />
import Carousel from "components/Molecules/Carousel/Carousel";
import React, { ComponentProps } from "react";

const items = [1, 2, 3, 4];

const render = (overwrite?: ComponentProps<typeof Carousel>) => {
  const props = { ...overwrite };
  return cy.mount(
    <Carousel {...props}>
      {items.map((i) => (
        <div key={i} className=" flex h-56 items-center justify-center">
          item {i}
        </div>
      ))}
    </Carousel>
  );
};

describe("<Carousel />", () => {
  it("renders ul", () => {
    render();
    cy.get("ul").should("be.visible");
  });
  it("renders on items as li ", () => {
    render();
    cy.get("li").should("have.length", items.length);
  });
  it("renders just one item", () => {
    render();
    cy.wait(10);
    cy.contains("item 1").should("be.visible");
    cy.contains("item 2").should("not.be.visible");
  });

  it(" navigation should work ", () => {
    render();

    cy.wait(10);
    cy.get('button[aria-label="carousel button previous"]').click();
    cy.contains("item 4").should("be.visible");
    cy.contains("item 1").should("not.be.visible");
    cy.get('button[aria-label="carousel button previous"]').click();
    cy.contains("item 3").should("be.visible");
    cy.contains("item 4").should("not.be.visible");

    cy.get('button[aria-label="carousel button next"]').click();
    cy.contains("item 4").should("be.visible");
    cy.contains("item 3").should("not.be.visible");
    cy.get('button[aria-label="carousel button next"]').click();
    cy.contains("item 1").should("be.visible");
    cy.contains("item 4").should("not.be.visible");
  });
});
