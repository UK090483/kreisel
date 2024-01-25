describe("create user spec", () => {
  before(() => {
    cy.eraseFakeUser();
  });
  after(() => {
    cy.eraseFakeUser();
  });

  it("redirect to login page if not Logged in", () => {
    cy.visit("/profile");
    cy.url().should("include", "/auth/login");
  });

  it("should status if not member", () => {
    cy.loginAsFakeUser({
      sessionName: "-member/-profile",
    });
    cy.visit("/profile");
    cy.contains(
      "Sie sind noch nicht für den Mitgliederbereich frei geschaltet."
    );
    cy.get('input[type="file"]').should("not.exist");
    cy.eraseFakeUser();
  });

  const testData = { name: { val: "name" }, firstName: { val: "firstName" } };

  it("should status if member", () => {
    cy.loginAsFakeUser({
      sessionName: "profile/member",
      values: { allowProfile: true, allowMember: true },
    });
    cy.visit("/profile");
    cy.contains("Status: bestätigt");
    cy.eraseFakeUser();
  });

  it("should handle name and first name", () => {
    cy.intercept("POST", "api/profile").as("profile");
    cy.loginAsFakeUser({ sessionName: "profile" });
    cy.visit("/profile");
    cy.get("#firstName").clear().type(testData.firstName.val);
    cy.get("#name").clear().type(testData.name.val);
    cy.get("#announcement").should("not.exist");
    cy.get('button[type="submit"]').click();
    cy.wait("@profile")
      .its("response.body.data.name")
      .should("equal", testData.name.val);
    cy.eraseFakeUser();
  });
});
