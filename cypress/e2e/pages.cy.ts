describe("pages", () => {
  Cypress.env("pages").forEach((e) => {
    it(`should have page: ${e.slug}`, () => {
      if (e.slug) {
        cy.visit(e.slug, { timeout: 5000 });
      }
    });
  });
});
