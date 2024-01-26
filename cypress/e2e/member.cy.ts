const isLoginPage = () => cy.url().should("include", "/auth/login");

let testUser = Cypress.env("testUser");

describe("create user spec", () => {
  before(() => {
    cy.eraseFakeUser();
  });
  afterEach(() => {
    cy.eraseFakeUser();
  });

  it("should redirect to login memberPages ", () => {
    cy.visit("/mitgliederbereich");
    isLoginPage();
    cy.visit("/");
    cy.get('[href="/mitgliederbereich"]', {}).should("not.exist");
  });

  it("should handle memberPages ", () => {
    cy.loginAsFakeUser({
      values: { allowMember: true },
    });
    cy.visit("/");
    cy.get('[href="/mitgliederbereich"]', {}).should("be.visible").click();
    cy.url().should("include", "/mitgliederbereich");
  });
});
