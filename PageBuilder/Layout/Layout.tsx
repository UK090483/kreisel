import { BackButton } from "./BackButton";
import Footer from "./Footer";
import Head from "./Head";
import { Header } from "./Header";
import Nav from "./Navigation/Nav";
import {
  useAppContext,
  useMemberPage,
} from "PageBuilder/AppContext/AppContext";
import Kreisel from "components/Kreisel";
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
  const { showSpinner } = useMemberPage();

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

  if (showSpinner && true) {
    return (
      <div
        data-test-id="spinner"
        className=" flex h-screen w-full items-center justify-center px-28"
      >
        <Kreisel className="max-w-sm "></Kreisel>
      </div>
    );
  }

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
        className={`min-h-screen antialiased transition-all duration-500 ease-out ${
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
