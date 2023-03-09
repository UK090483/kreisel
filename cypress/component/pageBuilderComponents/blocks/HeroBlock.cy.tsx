import HeroBlock from "../../../../PageBuilder/Blocks/hero/frontend/HeroBlock";
import { heroBlockQuery } from "../../../../PageBuilder/Blocks/hero/hero.query";
import React, { ComponentProps } from "react";

const render = ({
  props,
  blockData,
  context,
}: {
  props?: Partial<ComponentProps<typeof HeroBlock>>;
  blockData?: { [K: string]: any };
  context?: Parameters<typeof cy.mountWithContext>["1"]["context"];
}) => {
  cy.runSanityQuery({
    blockQuery: heroBlockQuery,
    blockData: {
      _type: "hero",
      _key: "key",
      ...blockData,
    },
  }).then((i) => {
    cy.mountWithContext(<HeroBlock {...i} {...props} />, { context });
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
    it(`renders pageContextImage in ${vp}`, function () {
      cy.viewport(vp);

      render({
        blockData: {
          content: this.content,
          variant: "half",
        },
        context: {
          data: {
            image: { ...Cypress.env("imageResult"), alt: "contextImage" },
          },
        },
      });
      cy.contains("TestContent").should("be.visible");
      cy.get("img[alt='contextImage']");
    });
  });

  viewPorts.forEach((vp) => {
    it(`renders in ${vp}`, function () {
      cy.viewport(vp);

      render({
        blockData: {
          content: this.content,
          variant: "half",
          image: { ...Cypress.env("imageRef"), alt: "testImage" },
        },
      });
      cy.contains("TestContent").should("be.visible");
      cy.get("img[alt='testImage']");
    });
  });
});
