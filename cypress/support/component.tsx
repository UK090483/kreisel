// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

import "../../styles/globals.css";
import { runSanityQuery, getSanityTestClient } from "../plugins/sanityQuery";

import { mountWithContext } from "../plugins/mountWithContext";
import { mountPageBuilderComponent } from "../plugins/mountPagebuilderComponent";
import { mount } from "cypress/react18";

Cypress.Commands.add("mountPageBuilderComponent", mountPageBuilderComponent);
Cypress.Commands.add("mountWithContext", mountWithContext);
Cypress.Commands.add("mount", mount);
Cypress.Commands.add("runSanityQuery", runSanityQuery);
Cypress.Commands.add("getSanityTestClient", getSanityTestClient);

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      mountWithContext: typeof mountWithContext;
      getSanityTestClient: typeof getSanityTestClient;
      mountPageBuilderComponent: typeof mountPageBuilderComponent;
    }
  }
}
