import ImagePlug from "PageBuilder/RichText/Plugs/ImagePlug/ImagePlug";

import {
  ImagePlugQuery,
  ImagePlugProps,
} from "PageBuilder/RichText/Plugs/ImagePlug/imagePlugQuery";

const render = (
  props?: Partial<
    Parameters<typeof cy.mountPageBuilderComponent<ImagePlugProps>>[0]
  >
) => {
  cy.mountPageBuilderComponent<ImagePlugProps>({
    Component: ImagePlug,
    blockQuery: ImagePlugQuery,

    ...props,
    blockData: {
      _type: "imagePlug",
      ...props?.blockData,
    },
  });
};

describe("<ImagePlug />", () => {
  beforeEach(() => {
    cy.get("[data-cy-root]").invoke("css", "overflow-x", "hidden");
  });
  it("renders nothing without image", () => {
    render();
    cy.get("[data-cy-root]").should("be.empty");
  });
  it("renders image", () => {
    render({ blockData: { image: Cypress.env("imageRef") } });
    cy.get("img").should("be.visible");
  });

  const sizes: [string, number][] = [
    ["1/4", 0.25],
    ["1/3", 1 / 3],
    ["1/2", 0.5],
    ["2/3", 2 / 3],
    ["full", 1],
  ];

  sizes.forEach(([width, multi]) => {
    it(`renders image with correct width ${width}`, () => {
      const vw = 1200;
      cy.viewport(vw, vw);
      render({
        blockData: {
          image: Cypress.env("imageRef"),
          customWidth: width as ImagePlugProps["customWidth"],
        },
      });

      cy.get("img")
        .computedStyle("width")
        .should("eq", `${multi * vw}px`);

      // Full in mobile
      cy.viewport(300, 300);
      cy.get("img").computedStyle("width").should("eq", `${300}px`);
    });
  });

  const ratios: [string, number][] = [
    ["3:2", 3 / 2],
    ["5:9", 5 / 9],
    ["16:9", 16 / 9],
    ["1:1", 1],
  ];

  ratios.forEach(([ratio, multi]) => {
    it(`renders image with correct ratio ${ratio}`, () => {
      const vw = 1200;
      cy.viewport(vw, vw);
      render({
        blockData: {
          image: Cypress.env("imageRef"),
          ratio: ratio as ImagePlugProps["ratio"],
          customWidth: "full",
        },
      });
      cy.get("img")
        .computedStyle("height")
        .should("eq", `${vw / multi}px`);
    });
  });
});
