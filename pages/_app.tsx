import "../styles/globals.css";

import { Layout } from "components";
import { PageProps } from "lib/SanityPageBuilder/types";

import { AppContextProvider } from "PageBuilder/AppContext/AppContext";
import AppConfig from "app.config.json";
import StoreContextProvider from "@services/StoreService/StoreProvider";
import { AuthContextProvider } from "@lib/Auth/AuthContext";
import { variables } from "styles/fonts";
import { ReactElement, ReactNode, lazy } from "react";
import { NextComponentType, NextPageContext } from "next";
import { Analytics } from "@vercel/analytics/react";
import { PreviewSuspense } from "@sanity/preview-kit";
const PreviewPageBuilderContextProvider = lazy(
  () => import("../PageBuilder/AppContext/PrevPageBuilderContext")
);
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  <SpeedInsights />;

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
          <StoreContextProvider>{getLayout(pageProps.id)}</StoreContextProvider>
        </PreviewPageBuilderContextProvider>
      </PreviewSuspense>
    );
  }

  return (
    <AuthContextProvider>
      <AppContextProvider data={pageProps.data} hostName={AppConfig.hostname}>
        <StoreContextProvider>{getLayout(pageProps.id)}</StoreContextProvider>
      </AppContextProvider>
    </AuthContextProvider>
  );
}

// eslint-disable-next-line import/no-unused-modules
export default App;
