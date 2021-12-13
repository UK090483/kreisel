import "../styles/globals.css";

import { Layout } from "@components/Layout/Layout";
import StoreContextProvider from "@services/StoreService/StoreProvider";
import { FetchStaticPropsResult } from "@services/SanityService/fetchStaticProps";
import { NextComponentType, NextPageContext } from "next";
import Cookie from "@services/CookieService/Cookie";
import { SessionProvider } from "next-auth/react";

interface AppPropsWithStaticProps {
  pageProps: FetchStaticPropsResult;
  Component: NextComponentType<NextPageContext, any, FetchStaticPropsResult>;
}

function App({ Component, pageProps }: AppPropsWithStaticProps) {
  return (
    <SessionProvider>
    <StoreContextProvider>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
      <Cookie />
    </StoreContextProvider>
    </SessionProvider>
  );
}

export default App;
