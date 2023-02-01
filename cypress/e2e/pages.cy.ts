describe("pages", () => {
  it("should be working", () => {
    Cypress.env("pages").forEach((e) => {
      if (e.slug) {
        cy.visit(e.slug);
      }
    });
  });
});
