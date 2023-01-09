/* eslint-disable @next/next/no-img-element */
import Svg from "@components/Svg";
import React from "react";
import { Link } from "@components/Link";
import useMenu from "@services/StoreService/hooks/useMenu";
import { Logo } from "@components/Layout/Logo";
import {
  HeaderNavigation,
  NavItemBaseProps,
  NavigationItemBase,
} from "../../../PageBuilder/Navigation";
import Underline from "@components/Underline/Underline";
import NavigationMobile from "PageBuilder/Navigation/NavigationMobile";
import { NavItem } from "PageBuilder/Navigation/types";
import ContactButton from "../Header/ContactButton";
import clsx from "clsx";

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
          <ContactButton />

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
      <NavigationMobile items={items} open={menuOpen} closeMenu={closeMenu} />
    </>
  );
};

export default React.memo(Nav, () => false);

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
