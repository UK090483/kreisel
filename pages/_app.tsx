import "../styles/globals.css";

import { Layout } from "components";
import { PageProps } from "lib/SanityPageBuilder/types";
import Cookie from "lib/Cookie/Cookie";
import Cart from "@services/ShopService/Cart";
import { ShopContextProvider } from "@services/ShopService/shopContext";
import PreviewIndicator from "lib/SanityPageBuilder/lib/preview/PreviewIndicator";
import { AppContextProvider } from "PageBuilder/AppContext/AppContext";
import AppConfig from "app.config.json";
import StoreContextProvider from "@services/StoreService/StoreProvider";
import { AuthContextProvider } from "@lib/Auth/AuthContext";
import { variables } from "styles/fonts";

import { ReactElement, ReactNode, lazy, useState } from "react";
import { NextComponentType, NextPageContext } from "next";
import { Analytics } from "@vercel/analytics/react";
import { PreviewSuspense } from "@sanity/preview-kit";
const PreviewPageBuilderContextProvider = lazy(
  () => import("../PageBuilder/AppContext/PrevPageBuilderContext")
);

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";

const _b = variables;
interface AppPropsWithStaticProps {
  pageProps: PageProps<any>;
  Component: NextComponentType<NextPageContext, any, PageProps<any>> & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
  initialSession: Session;
}

function App({ Component, pageProps: _pageProps }: AppPropsWithStaticProps) {
  const { data, query, preview } = _pageProps;
  const pageProps = { ..._pageProps, data };

  const [supabaseClient] = useState(() => createPagesBrowserClient());

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
      </PreviewSuspense>
    );
  }

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={_pageProps.initialSession}
    >
      <AuthContextProvider>
        <AppContextProvider data={pageProps.data} hostName={AppConfig.hostname}>
          <StoreContextProvider>
            <ShopContextProvider>
              {getLayout(pageProps.id)}
              <Cookie />
              <Cart />
            </ShopContextProvider>
          </StoreContextProvider>
        </AppContextProvider>
      </AuthContextProvider>
    </SessionContextProvider>
  );
}

// eslint-disable-next-line import/no-unused-modules
export default App;
