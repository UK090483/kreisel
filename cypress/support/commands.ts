/// <reference types="cypress" />

import { runSanityQuery } from "../plugins/sanityQuery";
import {
  deleteFakerUser,
  loginFakeUser,
  setFakerUserValue,
} from "../plugins/user";

Cypress.Commands.add("loginAsFakeUser", loginFakeUser);
Cypress.Commands.add("eraseFakeUser", deleteFakerUser);
Cypress.Commands.add("setFakerUserValue", setFakerUserValue);

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
    }
  }
}
