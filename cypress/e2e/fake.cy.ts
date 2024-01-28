import { deleteTestUsers, loginAsFakeUser } from "./helper/user";

describe("member spec", () => {
  before(() => {
    deleteTestUsers();
  });
  it("should redirect to login memberPages ", () => {
    cy.visit("/");
    loginAsFakeUser({ allowMember: "true" });
    cy.contains("button", "Sign out").click();
  });
});
