import { loginAsFakeUser, deleteTestUsers } from "./helper/user";

const isLoginPage = () => cy.url().should("include", "/auth/login");

describe("member spec", () => {
  before(() => {
    deleteTestUsers();
  });
  afterEach(() => {
    deleteTestUsers();
  });

  it("should redirect to login memberPages ", () => {
    cy.visit("/mitgliederbereich");
    isLoginPage();
    cy.visit("/");
    cy.get('[href="/mitgliederbereich"]', {}).should("not.exist");
  });
  it("should handle memberPages", () => {
    loginAsFakeUser({ allowMember: "true" });
    cy.visit("/");
    cy.get('[href="/mitgliederbereich"]', {}).should("be.visible").click();
    cy.url().should("include", "/mitgliederbereich");
  });
});
