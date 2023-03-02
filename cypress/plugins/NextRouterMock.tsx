import { RouterContext } from "next/dist/shared/lib/router-context";
import { NextRouter } from "next/router";

export type createNextRouterProps = Partial<NextRouter>;

export const createRouter = (params: createNextRouterProps) => ({
  route: "/",
  pathname: "/",
  query: {},
  asPath: "/",
  basePath: "",
  back: cy.spy().as("back"),
  beforePopState: cy.spy().as("beforePopState"),
  forward: cy.spy().as("forward"), // <---------- added `forward`
  prefetch: cy.stub().as("prefetch").resolves(),
  push: cy.spy().as("push"),
  reload: cy.spy().as("reload"),
  replace: cy.spy().as("replace"),
  events: {
    emit: cy.spy().as("emit"),
    off: cy.spy().as("off"),
    on: cy.spy().as("on"),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: "en",
  domainLocales: [],
  isPreview: false,
  ...params,
});

export const NextRouterMock = ({
  value,
  children,
}: {
  value: NextRouter;
  children: React.ReactNode;
}) => {
  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
};
