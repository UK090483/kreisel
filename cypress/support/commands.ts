/// <reference types="cypress" />
import { parse, evaluate } from "groq-js";
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("loginAsFakeUser", () => {
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
});

Cypress.Commands.add("eraseFakeUser", () => {
  return cy.request({ url: "/api/test/testUser", method: "DELETE" });
});

type runSanityQueryProps = {
  blockQuery?: string;
  blockData?: { [k: string]: any };
  query?: string;
  dataSet?: any[];
};

const runSanityQuery = async ({
  blockQuery,
  blockData,
  query,
  dataSet = [],
}: runSanityQueryProps) => {
  let queryType = "default";
  let _query = query;
  let _dataSet = [{ ...Cypress.env("image") }, dataSet];

  if (blockQuery) {
    queryType = "block";
    _query = `*[_type == "testitem"][0]{'content':content[]{
        ${blockQuery}
      }}`;
    _dataSet = [..._dataSet, { _type: "testitem", content: [blockData] }];
  }

  const tree = parse(_query);
  let value = await evaluate(tree, { dataset: [..._dataSet] });
  let result = await value.get();

  if (queryType === "block") {
    return result?.content[0];
  }
  return result;
};

Cypress.Commands.add("runSanityQuery", runSanityQuery);

const getTestImage = () => {
  return {
    asset: Cypress.env("image")._id,
    _type: "reference",
  };
};
Cypress.Commands.add("getTestImage", getTestImage);

declare global {
  namespace Cypress {
    interface Cypress {
      env(key: "pages"): { slug: string }[];
      env(key: "image"): any;
    }
    interface Chainable {
      runSanityQuery: typeof runSanityQuery;
      getTestImage;
      loginAsFakeUser: () => void;
      eraseFakeUser: () => void;
    }
  }
}
