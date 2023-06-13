import SectionBlock from "../../../../PageBuilder/Blocks/sectionBlock/frontend/SectionBlock";
import { sectionBlockQuery } from "../../../../PageBuilder/Blocks/sectionBlock/SectionBlockQuery";
import React, { ComponentProps } from "react";

const render = ({
  props,
  blockData,
}: {
  props?: Partial<ComponentProps<typeof SectionBlock>>;
  blockData?: { [K: string]: any };
}) => {
  cy.runSanityQuery({
    blockQuery: sectionBlockQuery,
    blockData: {
      _type: "section",
      _key: "key",
      ...blockData,
    },
  }).then((i) => {
    cy.mount(<SectionBlock {...i} {...props} />);
  });
};

const viewPorts: Cypress.ViewportPreset[] = [
  "iphone-5",
  "macbook-13",
  "macbook-16",
];

describe("<SectionBlock />", () => {
  beforeEach(function () {
    cy.fixture("sanityContent").then((i) => {
      this.content = i;
    });
  });

  viewPorts.forEach((vp) => {
    it(`renders in ${vp}`, function () {
      cy.viewport(vp);

      render({
        blockData: {
          content: this.content,
          variant: "half",
          image: Cypress.env("imageRef"),
        },
      });

      cy.contains("TestContent").should("be.visible");
      cy.get("img").then((img) => {
        const w = window.getComputedStyle(img.get(0)).width;
      });
    });
  });

  viewPorts.forEach((vp) => {
    it(`renders as accordion in ${vp}`, function () {
      cy.viewport(vp);

      render({
        blockData: {
          content: this.content,
          image: Cypress.env("imageRef"),
          type: "accordion",
        },
      });

      cy.contains("TestContent").should("not.be.visible");
      cy.get("button").click();
      cy.contains("TestContent").should("be.visible");
      cy.get("img").then((img) => {
        const w = window.getComputedStyle(img.get(0)).width;
        cy.log(w);
      });
    });
  });
});
