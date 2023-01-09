import "../styles/globals.css";
import Layout from "@components/Layout/Layout";
import { PageProps } from "@lib/SanityPageBuilder/types";
import { NextComponentType, NextPageContext } from "next";
import Cookie from "@lib/Cookie/Cookie";
import { SessionProvider } from "next-auth/react";
import { ReactElement, ReactNode } from "react";
import Cart from "@services/ShopService/Cart";
import { ShopContextProvider } from "@services/ShopService/shopContext";
import { PageData } from "./[[...slug]]";
// import usePreviewSubscription from "@lib/SanityPageBuilder/lib/preview/previewSubscription";
import PreviewIndicator from "@lib/SanityPageBuilder/lib/preview/PreviewIndicator";
import { AppContextProvider } from "PageBuilder/AppContext/AppContext";
import AppConfig from "app.config.json";
import StoreContextProvider from "@services/StoreService/StoreProvider";

import { lazy } from "react";
import { PreviewSuspense } from "@sanity/preview-kit";
const PreviewPageBuilderContextProvider = lazy(
  () => import("../PageBuilder/AppContext/PrevPageBuilderContext")
);
interface AppPropsWithStaticProps {
  pageProps: PageProps<PageData>;
  Component: NextComponentType<NextPageContext, any, PageProps<PageData>> & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
}

function App({ Component, pageProps: _pageProps }: AppPropsWithStaticProps) {
  const { data, query, preview } = _pageProps;

  // const { data, error } = usePreviewSubscription<PageData | null>(query, {
  //   initialData: _data,
  //   enabled: preview,
  // });

  const pageProps = { ..._pageProps, data };

  const getLayout = (id: string) => {
    return Component.getLayout ? (
      Component.getLayout(<Component key={id} {...pageProps} />)
    ) : (
      <Layout preview={preview} {...pageProps}>
        <Component key={id} {...pageProps} />
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
            <SessionProvider refetchInterval={10}>
              <ShopContextProvider>
                {getLayout(pageProps.id)}
                <Cookie />
                <Cart />
                {preview && <PreviewIndicator />}
              </ShopContextProvider>
            </SessionProvider>
          </StoreContextProvider>
        </PreviewPageBuilderContextProvider>
      </PreviewSuspense>
    );
  }

  return (
    <AppContextProvider data={pageProps.data} hostName={AppConfig.hostname}>
      <StoreContextProvider>
        <SessionProvider refetchInterval={10}>
          <ShopContextProvider>
            {getLayout(pageProps.id)}
            <Cookie />
            <Cart />
            {preview && <PreviewIndicator />}
          </ShopContextProvider>
        </SessionProvider>
      </StoreContextProvider>
    </AppContextProvider>
  );
}

export default App;
