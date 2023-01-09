import type { PageProps } from "@lib/SanityPageBuilder/types";
import { useAppContext } from "PageBuilder/AppContext/AppContext";
import { PageData } from "pages/[[...slug]]";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BackButton } from "./BackButton";
import Footer from "./Footer";
import Head from "./Head";
import { Header } from "./Header";
import Nav from "./Navigation/Nav";

interface LayoutProps {
  preview?: boolean;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const Layout: React.FC = (props) => {
  const { children } = props;
  const { data } = useAppContext();

  const isGlossary = data?.layout === "glossary";

  const firstRender = useRef(true);
  const [fadeIn, setFadeIn] = useState(false);

  useIsomorphicLayoutEffect(() => {
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
      {isGlossary ? (
        <BackButton />
      ) : (
        <Header>
          <Nav items={data?.navigation || []} />
        </Header>
      )}
      <Head name={data?.title} />

      <main
        className={`min-h-screen transition-all duration-500 ease-out ${
          fadeIn ? "animate-pageFadeIn" : ""
        }`}
      >
        {children}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
