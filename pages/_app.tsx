import "../styles/globals.css";

import Layout from "PageBuilder/Layout/Layout";
import { PageProps } from "lib/SanityPageBuilder/types";
import Cookie from "lib/Cookie/Cookie";
import Cart from "@services/ShopService/Cart";
import { ShopContextProvider } from "@services/ShopService/shopContext";
// import usePreviewSubscription from "lib/SanityPageBuilder/lib/preview/previewSubscription";
import PreviewIndicator from "lib/SanityPageBuilder/lib/preview/PreviewIndicator";
import { AppContextProvider } from "PageBuilder/AppContext/AppContext";
import AppConfig from "app.config.json";
import StoreContextProvider from "@services/StoreService/StoreProvider";
import { AuthContextProvider } from "@lib/Auth/AuthContext";
import { variables } from "styles/fonts";
import { ReactElement, ReactNode, lazy } from "react";
import { SessionProvider } from "next-auth/react";
import { NextComponentType, NextPageContext } from "next";
import { Analytics } from "@vercel/analytics/react";
import { PreviewSuspense } from "@sanity/preview-kit";
const PreviewPageBuilderContextProvider = lazy(
  () => import("../PageBuilder/AppContext/PrevPageBuilderContext")
);

const b = variables;
interface AppPropsWithStaticProps {
  pageProps: PageProps<any>;
  Component: NextComponentType<NextPageContext, any, PageProps<any>> & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
}

function App({ Component, pageProps: _pageProps }: AppPropsWithStaticProps) {
  const { data, query, preview } = _pageProps;
  const pageProps = { ..._pageProps, data };

  const getLayout = (id: string) => {
    return Component.getLayout ? (
      Component.getLayout(<Component key={id} {...pageProps} />)
    ) : (
      <Layout {...pageProps}>
        <Component key={id} {...pageProps} />
        <Analytics />
      </Layout>
    );
  };

  if (preview) {
    return (
      <PreviewSuspense fallback="Loading...">
        <SessionProvider refetchInterval={10}>
          <PreviewPageBuilderContextProvider
            query={query}
            data={pageProps.data}
            hostName={AppConfig.hostname}
          >
            <StoreContextProvider>
              <ShopContextProvider>
                {getLayout(pageProps.id)}
                <Cookie />
                <Cart />
                <PreviewIndicator />
              </ShopContextProvider>
            </StoreContextProvider>
          </PreviewPageBuilderContextProvider>
        </SessionProvider>
      </PreviewSuspense>
    );
  }

  return (
    <SessionProvider refetchInterval={10}>
      <AuthContextProvider>
        <AppContextProvider data={pageProps.data} hostName={AppConfig.hostname}>
          <StoreContextProvider>
            <SessionProvider refetchInterval={0}>
              <ShopContextProvider>
                {getLayout(pageProps.id)}
                <Cookie />
                <Cart />
              </ShopContextProvider>
            </SessionProvider>
          </StoreContextProvider>
        </AppContextProvider>
      </AuthContextProvider>
    </SessionProvider>
  );
}

// eslint-disable-next-line import/no-unused-modules
export default App;
