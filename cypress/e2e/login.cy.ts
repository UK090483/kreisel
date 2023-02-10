describe("create user spec", () => {
  it("creates user", () => {
    cy.visit("/");
    cy.loginAsFakeUser();
    cy.url().should("include", "/profile");
    cy.eraseFakeUser();

    cy.get("#notFindable");
  });
});
