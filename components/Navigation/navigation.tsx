import { Header } from "PageBuilder/Layout/Header/Header";
import { Logo } from "PageBuilder/Layout/Logo";
import ContactButton from "PageBuilder/Layout/Header/ContactButton";
import { HeaderNavigation } from "PageBuilder/Navigation/frontend";
import Link from "next/link";

import React from "react";

type NavigationProps = {
  nav: any;
};

const Navigation = ({ nav }: NavigationProps) => {
  return (
    <Header>
      <nav className="px-3 shadow-lg">
        <div className=" mx-auto flex  w-full items-center justify-between py-2 lg:container   ">
          <Link href="/" className=" shrink-0 ">
            <Logo />
          </Link>

          <div className="hidden w-full items-center justify-center lg:flex">
            {/* <NavigationMenuDemo items={nav} /> */}
            <HeaderNavigation
              items={nav}
              // NavigationItemBase={NavItemBaseWithUnderline}
            />
          </div>

          <ContactButton className="mr-3 hidden xl:block" />
        </div>
      </nav>
    </Header>
  );
};

export default Navigation;
