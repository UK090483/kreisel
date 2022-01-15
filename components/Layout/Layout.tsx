import type { PageProps } from "modules/SanityPageBuilder/types";
import { PageData } from "pages/[[...slug]]";
import React from "react";
import Footer from "./Footer";
import Head from "./Head";
import { Header } from "./Header";
import Nav from "./Navigation/Nav/Nav";
interface LayoutProps extends PageProps<PageData> {}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children, data } = props;

  return (
    <>
      <Header>
        <Nav items={data?.navigation || []} />
      </Header>
      <Head name={data?.title} />
      <main className="min-h-screen">{children}</main>
      <Footer navItems={data?.navigation || []} />
    </>
  );
};

export default Layout;
