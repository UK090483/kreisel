import "../styles/globals.css";
import Layout from "@components/Layout/Layout";
import StoreContextProvider from "@services/StoreService/StoreProvider";
import { PageProps } from "@privateModules/SanityPageBuilder/types";
import { NextComponentType, NextPageContext } from "next";
import Cookie from "@privateModules/Cookie/Cookie";
import { SessionProvider } from "next-auth/react";
import { ReactElement, ReactNode } from "react";
import Cart from "@services/ShopService/Cart";
import { ShopContextProvider } from "@services/ShopService/shopContext";
import { PageData } from "./[[...slug]]";
import usePreviewSubscription from "@privateModules/SanityPageBuilder/lib/preview/previewSubscription";
import PreviewIndicator from "@privateModules/SanityPageBuilder/lib/preview/PreviewIndicator";

interface AppPropsWithStaticProps {
  pageProps: PageProps<PageData>;
  Component: NextComponentType<NextPageContext, any, PageProps<PageData>> & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
}

function App({ Component, pageProps: _pageProps }: AppPropsWithStaticProps) {
  const { data: _data, query, preview } = _pageProps;

  const { data, error } = usePreviewSubscription<PageData | null>(query, {
    initialData: _data,
    enabled: preview,
  });

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

  return (
    <SessionProvider>
      <ShopContextProvider>
        <StoreContextProvider>
          {getLayout(pageProps.id)}
          <Cookie />
          <Cart />
          {process.env.NODE_ENV === "development" && (
            <div className="h-28 container z-50bg-red mx-auto"></div>
          )}
          {preview && <PreviewIndicator />}
        </StoreContextProvider>
      </ShopContextProvider>
    </SessionProvider>
  );
}

export default App;
