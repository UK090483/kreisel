/// <reference types="cypress" />

const login = () => {
  cy.visit("/");
  cy.get(`[aria-label="Sign in"]`).click();
  let { address, domain, name } = Cypress.env("testMail");
  cy.get("#email").type(address);
  cy.get("button[type=submit]").click();
  cy.wait(3000);
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

      // if (link) {
      //   cy.visit(link);
      // }

      cy.document({}).invoke({}, "write", html);

      //cy.contains("Log In").click();
    });
  });
};

export const loginFakeUser = (props?: {
  sessionName: string;
  options?: Cypress.SessionOptions;
}) => {
  if (props?.sessionName) {
    cy.session(props?.sessionName, () => {
      login();
      if (props?.options?.validate) {
        props.options.validate();
      }
    });
  }
  if (!props?.sessionName) {
    login();
  }
};

export const deleteFakerUser = () => {
  cy.log("nooooo");
  //return cy.request({ url: "/api/test/testUser", method: "DELETE" });
};

export const setFakerUserValue = (props: { [k: string]: any }) => {
  const searchParams = new URLSearchParams(props);

  return cy.request({
    url: `/api/test/testUser?${searchParams.toString()}`,
    method: "POST",
  });
};
