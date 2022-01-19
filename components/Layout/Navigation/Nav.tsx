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
} from "../../../privateModules/Navigation";
import Underline from "@components/Underline";
import NavigationMobile from "privateModules/Navigation/NavigationMobile";
import { NavItem } from "privateModules/Navigation/types";

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
          <Link href="/">
            <Logo />
          </Link>

          <div className="items-center justify-center hidden w-full lg:flex">
            <HeaderNavigation
              items={items}
              NavigationItemBase={NavItemBaseWithUnderline}
            />
          </div>

          {/* <div className="hidden lg:block">
            <Button> Kontakt aufnehmen</Button>
          </div>
          */}
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
      show={place === "link" || active}
      on={active ? "init" : "hover"}
      color={active ? "secondary" : "primary"}
      type={active ? "around" : "under"}
    >
      <NavigationItemBase {...props} />
    </Underline>
  );
};
