/// <reference types="cypress" />

import { runSanityQuery } from "../plugins/sanityQuery";
import { deleteFakerUser, loginFakeUser } from "../plugins/user";

Cypress.Commands.add("loginAsFakeUser", loginFakeUser);
Cypress.Commands.add("eraseFakeUser", deleteFakerUser);

declare global {
  namespace Cypress {
    interface Cypress {
      env(key: "pages"): { slug: string }[];
      env(key: "image"): any;
    }
    interface Chainable {
      runSanityQuery: typeof runSanityQuery;
      loginAsFakeUser: typeof loginFakeUser;
      eraseFakeUser: () => void;
    }
  }
}
