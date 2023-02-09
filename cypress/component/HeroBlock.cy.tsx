import HeroBlock from "../../PageBuilder/Blocks/hero/frontend/HeroBlock";
import React, { ComponentProps } from "react";
import { mount } from "cypress/react18";
import { cy, it } from "local-cypress";

const render = (overwrite?: Partial<ComponentProps<typeof HeroBlock>>) => {
  return mount(<HeroBlock {...overwrite} _key="key" _type="hero" />);
};

describe("<HeroBlock />", () => {
  it("renders", () => {
    cy.fixture("sanityImage").then((i) => {
      render({ photo: i });
    });
    cy.viewport("iphone-5");
    cy.viewport("macbook-13");
  });
});
