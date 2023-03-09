import { AppContextValue, AppContextProviderMock } from "./AppContextMock";
import {
  createNextRouterProps,
  createRouter,
  NextRouterMock,
} from "./NextRouterMock";
import {
  MockSessionContextProps,
  getSessionContextValue,
  MockSessionContextProvider,
} from "./SessionProviderMock";
import { mount } from "cypress/react18";

export const mountWithContext = (
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
    { ...options },
    rerenderKey
  );
};
