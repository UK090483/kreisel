let testUserA = Cypress.env("testUser");

describe("Sign in/up", () => {
  before(() => {
    cy.eraseFakeUser();
  });

  afterEach(() => {
    cy.eraseFakeUser();
  });

  it("Sign Up", () => {
    cy.visit("/");
    cy.contains("Sign in").click();
    cy.get('[data-testid="toSignUp"]').click();
    cy.url().should("include", "signup");
    cy.intercept("signup").as("signup");
    cy.visit("/auth/signup");
    cy.get("#email").type(testUserA.mail);
    cy.get("#firstName").type(testUserA.firstName);
    cy.get("#name").type(testUserA.name);
    cy.get("button[type='submit']").click();
    cy.location("pathname").should("eq", "/auth/checkMail");
    cy.wait("@signup").then(() => {
      cy.getLastMail();
      cy.get("a").click();
    });

    cy.location("pathname").should("eq", "/");
    cy.visit("/");
    cy.contains("button", "Sign out").click();
    cy.contains("button", "Sign in");
  });

  it("no signin for unknown users", () => {
    cy.visit("/");
    cy.contains("button", "Sign in").click();
    cy.get("#email").type(testUserA.mail);
    cy.get("button[type='submit']").click();
    cy.contains("der user ist nicht zu finden");
  });

  it("signin MagicLink", () => {
    cy.intercept("sendMagicLink*").as("sendMagicLink");
    cy.setFakerUserValue({});
    cy.visit("/");
    cy.contains("button", "Sign in").click();
    cy.get("#email").type(testUserA.mail);
    cy.get("button[type='submit']").click();
    cy.url().should("include", "checkMail");
    cy.wait("@sendMagicLink").then(() => {
      cy.getLastMail();
      cy.get("a").click();
      cy.location("pathname").should("eq", "/");
      cy.contains("button", "Sign out").click();
      cy.contains("button", "Sign in");
      cy.location("pathname").should("eq", "/");
    });
    cy.eraseFakeUser();
  });
  it("signin one Time Password", () => {
    cy.visit("/auth/login_credentials");
    cy.intercept("login_credentials*").as("login_credentials");
    cy.setFakerUserValue({});
    cy.get("#email").type(testUserA.mail);
    cy.get("#password").type("oneTimePassword");
    cy.get("button[type='submit']").click();
    cy.contains("button", "Sign out").click();
    cy.contains("button", "Sign in");
    cy.visit("/auth/login_credentials");
    cy.get("#email").type(testUserA.mail);
    cy.get("#password").type("oneTimePassword");
    cy.get("button[type='submit']").click();
    cy.contains("Email und Password passen leider nicht zusammen");
  });
});
