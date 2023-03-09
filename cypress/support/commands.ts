/// <reference types="cypress" />

import { runSanityQuery } from "../plugins/sanityQuery";
import {
  deleteFakerUser,
  loginFakeUser,
  setFakerUserValue,
} from "../plugins/user";

const computedStyle = (subject, c) => {
  return window.getComputedStyle(subject.get(0)).width;
};

Cypress.Commands.add("loginAsFakeUser", loginFakeUser);
Cypress.Commands.add("eraseFakeUser", deleteFakerUser);
Cypress.Commands.add("setFakerUserValue", setFakerUserValue);

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
    }
    interface Chainable {
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
