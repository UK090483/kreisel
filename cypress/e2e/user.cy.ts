describe("create user spec", () => {
  it("creates user", () => {
    cy.visit("/");
    cy.loginAsFakeUser();
    cy.url().should("include", "/profile");
    cy.setFakerUserValue({ allowMember: true });
    cy.visit("/");
    cy.get('[href="/mitgliederbereich"]').should("be.visible").click();
    cy.url().should("include", "/mitgliederbereich");
    cy.setFakerUserValue({ allowMember: false });
    cy.visit("/");
    cy.url().should("not.include", "/mitgliederbereich");
    cy.setFakerUserValue({ allowProfile: true });
    cy.visit("/profile");
    cy.eraseFakeUser();
  });
});
