import {
  getMailbox,
  getLastMail,
  deleteTestUsers,
  testuser,
  loginAsFakeUser,
  createUser,
} from "./helper/user";

describe("Sign in/up spec", () => {
  before(() => {
    deleteTestUsers();
  });

  afterEach(() => {
    deleteTestUsers();
  });

  it("Sign Up", () => {
    cy.visit("/");
    getMailbox().then((m) => {
      cy.contains("Sign in").click();
      cy.get('[data-testid="toSignUp"]').click();
      cy.get("#email").type(m.address);
      cy.get("#firstName").type(testuser.firstName);
      cy.get("#name").type(testuser.name);
      cy.get("button[type='submit']").click();
      cy.location("pathname").should("eq", "/auth/checkMail");
      getLastMail(m);
      cy.get("a").click();
      cy.intercept("GET", "api/auth/user").as("user");
      cy.wait("@user", { timeout: 20000 });
    });
    cy.location("pathname").should("eq", "/");
    cy.visit("/");
    cy.contains("button", "Sign out").click();
    cy.contains("button", "Sign in");
  });

  it("no signin for unknown users", () => {
    cy.visit("/");
    cy.contains("button", "Sign in").click();
    cy.get("#email").type(testuser.mail);
    cy.get("button[type='submit']").click();
    cy.contains("der user ist nicht zu finden");
  });

  it("signin MagicLink", () => {
    cy.visit("/");
    loginAsFakeUser({ allowMember: "true" });
    cy.contains("button", "Sign out").click();
  });

  it("signin one Time Password", () => {
    createUser({ mailName: testuser.name });
    cy.visit("/auth/login_credentials");
    cy.intercept("login_credentials*").as("login_credentials");
    cy.get("#email").type(testuser.mail);
    cy.get("#password").type("oneTimePassword");
    cy.get("button[type='submit']").click();
    cy.contains("button", "Sign out").click();
    cy.contains("button", "Sign in");
    cy.visit("/auth/login_credentials");
    cy.get("#email").type(testuser.mail);
    cy.get("#password").type("oneTimePassword");
    cy.get("button[type='submit']").click();
    cy.contains("Email und Password passen leider nicht zusammen");
  });
});
