///<reference path="../../support/component.ts" />
import HeroBlock from "../../../PageBuilder/Blocks/hero/frontend/HeroBlock";
import { heroBlockQuery } from "../../../PageBuilder/Blocks/hero/hero.query";
import React, { ComponentProps } from "react";

const render = ({
  props,
  blockData,
}: {
  props?: Partial<ComponentProps<typeof HeroBlock>>;
  blockData?: { [K: string]: any };
}) => {
  cy.runSanityQuery({
    blockQuery: heroBlockQuery,
    blockData: {
      _type: "hero",
      _key: "key",
      ...blockData,
    },
  }).then((i) => {
    cy.mount(<HeroBlock {...i} {...props} />);
  });
};

const viewPorts: Cypress.ViewportPreset[] = [
  "iphone-5",
  "macbook-13",
  "macbook-16",
];

describe("<HeroBlock />", () => {
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
        cy.log(w);
      });
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
        cy.log(w);
      });
    });
  });
});
