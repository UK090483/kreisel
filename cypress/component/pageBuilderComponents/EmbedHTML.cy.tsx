import EmbedHTML from "PageBuilder/RichText/Plugs/EmbedHTML/EmbedHTML";

describe("Name of the group", () => {
  it("should not render if it has no Html Prop", () => {
    cy.mountPageBuilderComponent({
      Component: EmbedHTML,
    });

    cy.get("[data-cy-root]").should("be.empty");
  });
  it("should render Html", () => {
    cy.mountPageBuilderComponent({
      Component: EmbedHTML,
      props: { html: "<p>testHtml</p>" },
    });
    cy.get("p").should("have.text", "testHtml");
  });
});
