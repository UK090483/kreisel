const isLoginPage = () => cy.url().should("include", "/auth/login");

describe("create user spec", () => {
  before(() => {
    cy.eraseFakeUser();
  });
  after(() => {
    cy.eraseFakeUser();
  });

  it("creates user", () => {
    cy.visit("/");
    cy.loginAsFakeUser({
      sessionName: "session",
      options: {
        validate: () => {
          cy.url().should("include", "/profile");
        },
      },
    });
  });

  it("should handle memberPages ", () => {
    cy.visit("/mitgliederbereich");
    isLoginPage();
    cy.visit("/");
    cy.loginAsFakeUser({ sessionName: "session" });
    cy.get('[href="/mitgliederbereich"]', {}).should("not.exist");
    cy.setFakerUserValue({ allowMember: true });
    cy.visit("/");
    cy.get('[href="/mitgliederbereich"]', {}).should("be.visible").click();
    cy.url().should("include", "/mitgliederbereich");
    cy.setFakerUserValue({ allowMember: false });
    cy.reload();
    cy.url().should("include", "/profile");
  });

  const testData = { name: { val: "name" }, firstName: { val: "firstName" } };

  it("should handle Profile", () => {
    cy.intercept("POST", "api/profile").as("profile");
    cy.visit("/profile");
    isLoginPage();
    cy.visit("/");
    cy.loginAsFakeUser({ sessionName: "session" });
    cy.visit("/profile");
    cy.get("#announcement");
    cy.get("#firstName").type(testData.firstName.val);
    cy.get("#name").type(testData.name.val);
    cy.get("#announcement").should("not.exist");
    cy.get('button[type="submit"]').click();
    cy.wait("@profile");
    cy.wait(3000);

    cy.reload();
    cy.get("#firstName").should("have.value", testData.firstName.val);
    cy.get("#name").should("have.value", testData.name.val);
    cy.setFakerUserValue({ allowProfile: true });
    cy.reload();
    cy.get("#image").should("be.visible");
  });
});
