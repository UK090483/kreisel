import { FetchStaticPropsResult } from "@services/SanityService/fetchStaticProps";
import React from "react";
import Footer from "./Footer";
import Head from "./Head";
import { Header } from "./Header";
import Nav from "./Navigation/Nav/Nav";
interface LayoutProps extends FetchStaticPropsResult {}

const Layout: React.FC<LayoutProps> = ({ children, page }) => {
  return (
    <>
      <Header>
        <Nav items={page?.siteSettings.mainNav || []} />
      </Header>
      <Head name={page?.title} />
      <main className="min-h-screen">{children}</main>
      <Footer navItems={page?.siteSettings.mainNav || []} />
    </>
  );
};

export default Layout;
