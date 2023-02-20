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
import { runSanityQuery } from "../plugins/sanityQuery";
import {
  AppContextProvider,
  AppContextProviderProps,
} from "../../PageBuilder/AppContext/AppContext";
import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";
import { mount } from "cypress/react18";

addMatchImageSnapshotCommand();

const mountWithContext = ({
  jsx,
  options,
  rerenderKey,
  context,
}: {
  jsx: Parameters<typeof mount>[0];
  options?: Parameters<typeof mount>[1];
  rerenderKey?: Parameters<typeof mount>[2];
  context?: Partial<AppContextProviderProps>;
}) => {
  return mount(
    <AppContextProvider
      hostName="testHostName"
      data={{ title: "TestTitle", ...context.data }}
      {...context}
    >
      {jsx}
    </AppContextProvider>,
    options,
    rerenderKey
  );
};

Cypress.Commands.add("mountWithContext", mountWithContext);
Cypress.Commands.add("mount", mount);
Cypress.Commands.add("runSanityQuery", runSanityQuery);

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      mountWithContext: typeof mountWithContext;
    }
  }
}

// Example use:
// cy.mount(<MyComponent />)
