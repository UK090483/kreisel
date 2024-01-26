describe("pages", () => {
  Cypress.env("pages").forEach((e) => {
    it.skip(`should have page: ${e.slug}`, () => {
      if (e.slug) {
        cy.request(`${Cypress.config().baseUrl}${e.slug}`).its(
          "isOkStatusCode"
        );

        cy.visit(e.slug);
      }
    });
  });
});
