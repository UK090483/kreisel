import "../styles/globals.css";

import Layout from "@components/Layout/Layout";
import StoreContextProvider from "@services/StoreService/StoreProvider";
import { PageProps } from "Modules/SanityPageBuilder/types";
import { NextComponentType, NextPageContext } from "next";
import Cookie from "Modules/Cookie/Cookie";
import { SessionProvider } from "next-auth/react";
import { ReactElement, ReactNode } from "react";

import Cart from "@services/ShopService/Cart";
import { ShopContextProvider } from "@services/ShopService/shopContext";
import { PageData } from "./[[...slug]]";

interface AppPropsWithStaticProps {
  pageProps: PageProps<PageData>;
  Component: NextComponentType<NextPageContext, any, PageProps<PageData>> & {
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
          {getLayout}
          <Cookie />
          <Cart />
        </StoreContextProvider>
      </ShopContextProvider>
    </SessionProvider>
  );
}

export default App;
