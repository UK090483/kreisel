import type { PageProps } from "@lib/SanityPageBuilder/types";
import { PageData } from "pages/[[...slug]]";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const Layout: React.FC<LayoutProps> = (props) => {
  const { children, data, preview = false } = props;

  const firstRender = useRef(true);

  const [fadeIn, setFadeIn] = useState(false);

  console.log(data);

  const { transitionStage, displayChildren, handleTransitionEnd } =
    usePageTransition({ children, preview });

  useIsomorphicLayoutEffect(() => {
    console.log("render");

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setFadeIn(true);
    const timeOut = setTimeout(() => {
      setFadeIn(false);
    }, 700);
    return () => {
      clearTimeout(timeOut);
    };
  }, [data?._id]);

  return (
    <>
      <Header>
        <Nav items={data?.navigation || []} />
      </Header>
      <Head name={data?.title} />

      <main
        className={`min-h-screen transition-all duration-500 ease-out ${
          fadeIn ? "animate-pageFadeIn" : ""
        }`}
      >
        {children}
      </main>

      <Footer data={data} />
    </>
  );
};

export default Layout;
