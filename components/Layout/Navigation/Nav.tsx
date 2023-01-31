/* eslint-disable @next/next/no-img-element */

import ContactButton from "../Header/ContactButton";
import Svg from "components/Svg";
import { Link } from "components/Link";
import useMenu from "@services/StoreService/hooks/useMenu";
import { Logo } from "components/Layout/Logo";
import Underline from "components/Underline/Underline";
import {
  HeaderNavigation,
  NavItemBaseProps,
  NavigationItemBase,
} from "PageBuilder/Navigation/frontend";
import NavigationMobile from "PageBuilder/Navigation/frontend/NavigationMobile";
import { NavItem } from "PageBuilder/Navigation/frontend/types";
import clsx from "clsx";
import React from "react";

interface NavProps {
  items: NavItem[];
}

const Nav: React.FC<NavProps> = ({ items }) => {
  const { toggleMenu, menuOpen, closeMenu } = useMenu();

  const handleNavClick = () => {
    toggleMenu();
  };
  return (
    <>
      <nav className=" shadow-lg  px-3">
        <div className=" mx-auto lg:container  flex items-center justify-between w-full py-2   ">
          <Link href="/" className=" shrink-0 ">
            <Logo />
          </Link>

          <div className="items-center justify-center hidden w-full lg:flex">
            <HeaderNavigation
              items={items}
              NavigationItemBase={NavItemBaseWithUnderline}
            />
          </div>
          <ContactButton className="hidden xl:block" />

          <button
            data-testid="menu-overlay-toggle"
            onClick={handleNavClick}
            className="lg:hidden  w-8 h-8 "
            aria-label="Open the Menu"
          >
            <Svg className="w-full" icon={menuOpen ? "erase" : "hamburger"} />
          </button>
        </div>
      </nav>
      <NavigationMobile
        NavigationItemBase={NavItemBaseMobile}
        items={items}
        open={menuOpen}
        closeMenu={closeMenu}
      >
        <ContactButton className="mt-6" dark />
      </NavigationMobile>
    </>
  );
};

export default Nav;

const NavItemBaseWithUnderline: React.FC<NavItemBaseProps> = (props) => {
  const { place, active } = props;

  return (
    <Underline
      show={place === "link" || place === "dropdown"}
      on={active ? "init" : "hover"}
      color={"primary-light"}
      variant={[1, 2, 3]}
      className={clsx("-translate-y-4 ")}
    >
      <NavigationItemBase {...props} />
    </Underline>
  );
};

const NavItemBaseMobile: React.FC<NavItemBaseProps> = (props) => {
  return <NavigationItemBase {...props} className="  my-3" />;
};
