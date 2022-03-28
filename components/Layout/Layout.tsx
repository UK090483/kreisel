import type { PageProps } from "@lib/SanityPageBuilder/types";
import { PageData } from "pages/[[...slug]]";
import React from "react";
import BackGround from "./BackGround";
import Footer from "./Footer";
import Head from "./Head";
import { Header } from "./Header";
import Nav from "./Navigation/Nav";

import usePageTransition from "@hooks/usePageTransition";
import useScroll from "@hooks/useScroll";

interface LayoutProps extends PageProps<PageData> {
  preview?: boolean;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children, data, preview = false } = props;

  const { transitionStage, displayChildren, handleTransitionEnd } =
    usePageTransition({ children, preview });

  return (
    <>
      <Header>
        <Nav items={data?.navigation || []} />
      </Header>
      <Head name={data?.title} />

      <main
        onTransitionEnd={handleTransitionEnd}
        className={`min-h-screen transition-all duration-500 ease-out ${
          transitionStage === "fadeIn"
            ? "opacity-100 translate-y-0"
            : "opacity-0  -translate-y-10"
        }`}
      >
        {displayChildren}
      </main>

      <Footer data={data} />
    </>
  );
};

export default Layout;
