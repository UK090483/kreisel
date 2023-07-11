"use client";
import Head from "./Head/Head";
import { Footer, Header } from "components";
import { BackButton } from "components/Organism/Layout/BackButton";
import { useAppContext } from "PageBuilder/AppContext/AppContext";

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  PropsWithChildren,
} from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const Layout: React.FC<PropsWithChildren> = (props) => {
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
      <Head />
      {isGlossary ? <BackButton /> : <Header items={data?.navigation || []} />}

      <main
        className={`min-h-screen antialiased transition-all duration-500 ease-out ${
          fadeIn ? "animate-pageFadeIn" : ""
        }`}
      >
        {children}
      </main>
      <Footer contact={data?.footer?.contact} info={data?.footer?.footerInfo} />
    </>
  );
};

export default Layout;
