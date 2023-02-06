describe("pages", () => {
  Cypress.env("pages").forEach((e) => {
    if (e.slug) {
      it(`should find page ${e.slug}`, () => {
        cy.visit(e.slug);
      });
    }
  });
});
