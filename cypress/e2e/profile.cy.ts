import { loginAsFakeUser, deleteTestUsers } from "./helper/user";

describe("profile spec", () => {
  before(() => {
    deleteTestUsers();
  });
  afterEach(() => {
    deleteTestUsers();
  });

  it("redirect to login page if not Logged in", () => {
    cy.visit("/profile");
    cy.url().should("include", "/auth/login");
  });

  it("should status if not member", () => {
    loginAsFakeUser({});
    cy.visit("/");
    cy.get("[href='/profile']").click();
    cy.contains(
      "Sie sind noch nicht für den Mitgliederbereich frei geschaltet."
    );
    cy.get('input[type="file"]').should("not.exist");
  });

  const testData = { name: { val: "name" }, firstName: { val: "firstName" } };

  it("should show status if member", () => {
    loginAsFakeUser({ allowProfile: "true", allowMember: "true" });

    cy.get("[href='/profile']").click();
    cy.contains("Mitgliedsstatus: bestätigt");
  });

  it("should handle name and first name", () => {
    cy.intercept("POST", "api/profile").as("profile");
    loginAsFakeUser({ allowProfile: "true", allowMember: "true" });
    cy.get("[href='/profile']").click();
    cy.get("#firstName").clear().type(testData.firstName.val);
    cy.get("#name").clear().type(testData.name.val);
    cy.get("#announcement").should("not.exist");
    cy.get('button[type="submit"]').click();
    cy.wait("@profile")
      .its("response.body.data.name")
      .should("equal", testData.name.val);
  });
});
