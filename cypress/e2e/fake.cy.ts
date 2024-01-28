import { deleteTestUsers, loginAsFakeUser } from "./helper/user";

describe("member spec", () => {
  before(() => {
    deleteTestUsers();
  });
  it("should redirect to login memberPages ", () => {
    cy.visit("/");
    loginAsFakeUser({ allowMember: "true" });
    // getMailbox().then((m) => {
    //   createUser({ mailName: m.name, allowMember: "true" });
    //   login(m.address);
    //   getLastMail(m);
    //   cy.get("a").click();
    // });
  });
});
