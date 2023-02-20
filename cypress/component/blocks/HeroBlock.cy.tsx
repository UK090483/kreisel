///<reference path="../../support/component.tsx" />

import HeroBlock from "../../../PageBuilder/Blocks/hero/frontend/HeroBlock";
import { heroBlockQuery } from "../../../PageBuilder/Blocks/hero/hero.query";
import React, { ComponentProps } from "react";

const render = ({
  props,
  blockData,
  context,
}: {
  props?: Partial<ComponentProps<typeof HeroBlock>>;
  blockData?: { [K: string]: any };
  context?: Parameters<typeof cy.mountWithContext>["0"]["context"];
}) => {
  cy.runSanityQuery({
    blockQuery: heroBlockQuery,
    blockData: {
      _type: "hero",
      _key: "key",
      ...blockData,
    },
  }).then((i) => {
    cy.mountWithContext({ jsx: <HeroBlock {...i} {...props} />, context });
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

      cy.log(Cypress.env("imageResult"));
      cy.log(Cypress.env("image"));

      render({
        blockData: {
          content: this.content,
          variant: "half",
          // image: Cypress.env("imageRef"),
        },
        context: { data: { image: Cypress.env("imageResult") } },
      });

      cy.contains("TestContent").should("be.visible");
      // cy.get("img").then((img) => {
      //   const w = window.getComputedStyle(img.get(0)).width;
      //   cy.log(w);
      // });
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
