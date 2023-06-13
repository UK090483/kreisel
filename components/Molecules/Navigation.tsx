"use client";
/* eslint-disable @next/next/no-img-element */

import {
  HeaderNavigation,
  NavItemBaseProps,
  NavigationItemBase,
} from "./Navigation/index";
import NavigationMobile from "./Navigation/NavigationMobile";
import { NavItem } from "./Navigation/types";
import Svg from "components/Atoms/Svg";
import Link from "components/Atoms/Link";
import useMenu from "@services/StoreService/hooks/useMenu";
import { Logo } from "components/Atoms/Logo";
import Underline from "components/Atoms/Underline/Underline";
import AuthWidget from "@lib/Auth/AuthWidget";
import Button from "components/Atoms/Button/Button";
import clsx from "clsx";
import React from "react";

interface NavProps {
  items: NavItem[];
}

const Navigation: React.FC<NavProps> = ({ items }) => {
  const { toggleMenu, menuOpen, closeMenu } = useMenu();

  const handleNavClick = () => {
    toggleMenu();
  };
  return (
    <>
      <nav className="px-3 shadow-lg">
        <div className=" mx-auto flex  w-full items-center justify-between py-2 lg:container   ">
          <Link href="/" className=" shrink-0 ">
            <Logo />
          </Link>

          <div className="hidden w-full items-center justify-center lg:flex">
            <HeaderNavigation
              items={items}
              NavigationItemBase={NavItemBaseWithUnderline}
              className=" justify-center"
            />
          </div>
          <ContactButton className="mr-3 hidden xl:block" />

          <button
            data-testid="menu-overlay-toggle"
            onClick={handleNavClick}
            className="h-8 w-8 lg:hidden "
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
        <ContactButton />
        <AuthWidget className="flex-col gap-2" />
      </NavigationMobile>
    </>
  );
};

export default Navigation;

interface IContactButtonProps {
  className?: string;
  dark?: boolean;
}
const ContactButton: React.FunctionComponent<IContactButtonProps> = (props) => {
  const { className, dark } = props;
  return (
    <Button
      href={"mailto:kreisel"}
      className={clsx(
        " animate-slideInRight",

        className
      )}
    >
      Kontakt aufnehmen
    </Button>
  );
};

const NavItemBaseWithUnderline: React.FC<NavItemBaseProps> = (props) => {
  const { place, active } = props;

  return (
    <Underline
      show={place === "link" || place === "dropdown"}
      on={active ? "init" : "hover"}
      color={"primary-light"}
      variant={[1, 2, 3]}
      className={clsx("translate-y-[-1em]")}
    >
      <NavigationItemBase {...props} className="flex items-center" />
    </Underline>
  );
};

const NavItemBaseMobile: React.FC<NavItemBaseProps> = (props) => {
  return <NavigationItemBase {...props} className=" my-3" />;
};
