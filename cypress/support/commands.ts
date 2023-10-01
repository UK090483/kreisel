/// <reference types="cypress" />

import "cypress-real-events";
import { runSanityQuery } from "../plugins/sanityQuery";
import {
  deleteFakerUser,
  getLastMail,
  loginFakeUser,
  setFakerUserValue,
} from "../plugins/user";

Cypress.Commands.add("loginAsFakeUser", loginFakeUser);
Cypress.Commands.add("eraseFakeUser", deleteFakerUser);
Cypress.Commands.add("setFakerUserValue", setFakerUserValue);
Cypress.Commands.add("getLastMail", getLastMail);

Cypress.Commands.add(
  "computedStyle",
  //@ts-ignore
  { prevSubject: "element" },
  (ele, arg) => {
    return window.getComputedStyle(ele.get(0))[arg];
  }
);
declare global {
  namespace Cypress {
    interface Cypress {
      env(key: "pages"): { slug: string }[];
      env(key: "image"): any;
      env(key: "testUser"): {
        mail: string;
        name: string;
        firstName: string;
        domain: string;
      };
    }
    interface Chainable {
      getLastMail: typeof getLastMail;
      runSanityQuery: typeof runSanityQuery;
      loginAsFakeUser: typeof loginFakeUser;
      setFakerUserValue: typeof setFakerUserValue;
      eraseFakeUser: () => void;
      computedStyle: <K extends keyof CSSStyleDeclaration>(
        style: K
      ) => Chainable<CSSStyleDeclaration[K]>;
    }
  }
}
