import type { PageProps } from "privateModules/SanityPageBuilder/types";
import { PageData } from "pages/[[...slug]]";
import React from "react";
import BackGround from "./BackGround";
import Footer from "./Footer";
import Head from "./Head";
import { Header } from "./Header";
import Nav from "./Navigation/Nav";

interface LayoutProps extends PageProps<PageData> {}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children, data } = props;
  const [displayChildren, setDisplayChildren] = React.useState(children);
  const [transitionStage, setTransitionStage] = React.useState("fadeOut");

  React.useEffect(() => {
    setTransitionStage("fadeIn");
  }, []);

  React.useEffect(() => {
    if (children !== displayChildren) setTransitionStage("fadeOut");
  }, [children, setDisplayChildren, displayChildren]);

  return (
    <>
      <Header>
        <Nav items={data?.navigation || []} />
      </Header>
      <Head name={data?.title} />

      <main
        onTransitionEnd={() => {
          if (transitionStage === "fadeOut") {
            console.log("fading out");
            setDisplayChildren(children);
            setTransitionStage("fadeIn");
          }
        }}
        className={`min-h-screen transition-opacity duration-300 ease-out ${
          transitionStage === "fadeIn" ? "opacity-100 " : "opacity-0"
        }`}
      >
        {displayChildren}
      </main>

      <Footer navItems={data?.navigation || []} />
    </>
  );
};

export default Layout;
