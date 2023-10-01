let testUserA = Cypress.env("testUser");

describe("create user spec", () => {
  before(() => {
    cy.eraseFakeUser();
  });
  after(() => {
    cy.eraseFakeUser();
  });

  it("creates user", () => {
    cy.intercept("signup").as("signup");
    cy.visit("/auth/signup");
    cy.get("#email").type(testUserA.mail);
    cy.get("#firstName").type(testUserA.firstName);
    cy.get("#name").type(testUserA.name);
    cy.get("button[type='submit']").click();
    cy.wait("@signup", { responseTimeout: 20000 }).then(() => {
      cy.url().should("include", "checkMail");
      cy.getLastMail();
      cy.get("a").click();
      cy.url({ timeout: 10000 }).should("eq", Cypress.config().baseUrl);
      cy.contains("button", "Sign out");
      cy.eraseFakeUser();
    });
  });

  it("no signin for unknown users", () => {
    cy.visit("/");
    cy.contains("button", "Sign in").click();
    cy.get("#email").type(testUserA.mail);
    cy.get("button[type='submit']").click();
    cy.contains("der user ist nicht zu finden");
  });

  it.only("signin for known users", () => {
    cy.intercept("sendMagicLink*").as("sendMagicLink");
    cy.setFakerUserValue({});
    cy.visit("/");
    cy.contains("button", "Sign in").click();
    cy.get("#email").type(testUserA.mail);
    cy.get("button[type='submit']").click();
    cy.wait("@sendMagicLink").then(() => {
      cy.url().should("include", "checkMail");
      cy.getLastMail();
      cy.get("a").click();
      cy.url({ timeout: 10000 }).should("eq", Cypress.config().baseUrl);
      cy.contains("button", "Sign out").click();
      cy.contains("button", "Sign in");
      cy.url({ timeout: 10000 }).should("eq", Cypress.config().baseUrl);
    });
    cy.eraseFakeUser();
  });
});
