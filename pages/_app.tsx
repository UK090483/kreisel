import "../styles/globals.css";

import { Layout } from "@components/Layout/Layout";
import StoreContextProvider from "@services/StoreService/StoreProvider";
import { FetchStaticPropsResult } from "@services/SanityService/fetchStaticProps";
import { NextComponentType, NextPageContext } from "next";
import Cookie from "Modules/Cookie/Cookie";
import { SessionProvider } from "next-auth/react";
import { ReactElement, ReactNode } from "react";

import Cart from "@services/ShopService/Cart";
import { ShopContextProvider } from "@services/ShopService/shopContext";

interface AppPropsWithStaticProps {
  pageProps: FetchStaticPropsResult;
  Component: NextComponentType<NextPageContext, any, FetchStaticPropsResult> & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
}

function App({ Component, pageProps }: AppPropsWithStaticProps) {
  const getLayout = Component.getLayout ? (
    Component.getLayout(<Component {...pageProps} />)
  ) : (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );

  return (
    <SessionProvider>
      <ShopContextProvider>
        <StoreContextProvider>
          {/* <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout> */}
          {getLayout}
          <Cookie />
          <Cart />
        </StoreContextProvider>
      </ShopContextProvider>
    </SessionProvider>
  );
}

export default App;
