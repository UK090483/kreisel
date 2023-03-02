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

import {
  NextRouterMock,
  createRouter,
  createNextRouterProps,
} from "../plugins/NextRouterMock";

import {
  AppContextProviderMock,
  AppContextValue,
} from "../plugins/AppContextMock";

import {
  MockSessionContextProvider,
  MockSessionContextProps,
  getSessionContextValue,
} from "../plugins/SessionProviderMock";
import { mount } from "cypress/react18";

const mountWithContext = (
  jsx: Parameters<typeof mount>[0],
  {
    options,
    rerenderKey,
    context,
    router,
    session,
  }: {
    options?: Parameters<typeof mount>[1];
    rerenderKey?: Parameters<typeof mount>[2];
    context?: AppContextValue;
    router?: createNextRouterProps;
    session?: MockSessionContextProps;
  }
) => {
  const preparedRouter = createRouter(router);
  const sessionContextValue = getSessionContextValue(session);

  return mount(
    <NextRouterMock value={preparedRouter}>
      <MockSessionContextProvider value={sessionContextValue}>
        <AppContextProviderMock value={context}>{jsx}</AppContextProviderMock>
      </MockSessionContextProvider>
    </NextRouterMock>,
    options,
    rerenderKey
  );
};

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
    }
  }
}
