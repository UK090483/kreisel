/// <reference types="cypress" />

export const loginFakeUser = () => {
  cy.visit("/");
  cy.get(".mx-auto > .flex > button").click();
  let { address, domain, name } = Cypress.env("testMail");
  cy.log(address);
  cy.log(domain);
  cy.log(name);

  cy.get("#email").type(address);
  cy.get(".px-12").click();
  cy.wait(1000);
  cy.request<{ id: string }[]>({
    url: `https://www.1secmail.com/api/v1/?action=getMessages&login=${name}&domain=${domain}`,
  }).then((res) => {
    const id = res.body[0]?.id;
    cy.request<{ htmlBody?: string }>({
      url: `https://www.1secmail.com/api/v1/?action=readMessage&login=${name}&domain=${domain}&id=${id}`,
    }).then((res) => {
      const linkRx = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/;
      const html = res.body.htmlBody || "";
      const matchRes = html.match(linkRx);
      const link = matchRes && matchRes[2];
      if (link) {
        cy.visit(link);
      }
    });
  });
};

export const deleteFakerUser = () => {
  return cy.request({ url: "/api/test/testUser", method: "DELETE" });
};

export const setFakerUserValue = (props: { [k: string]: any }) => {
  const searchParams = new URLSearchParams(props);

  return cy.request({
    url: `/api/test/testUser?${searchParams.toString()}`,
    method: "POST",
  });
};
