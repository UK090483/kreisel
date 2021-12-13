/* eslint-disable @next/next/no-img-element */
import Svg from "@components/Svg";
import React from "react";

import { Link } from "@components/Link";

import useMenu from "@services/StoreService/hooks/useMenu";
import MegaNav, { NavItemMegaNavProps } from "../MegaNav/MegaNav";
import MegaNavMobile from "../MegaNav/MegaNavMobile";
import { Logo } from "@components/Layout/Logo";
import { NavItemProps } from "../NavItem/NavItem";
import { NavigationModul } from "@services/NavigationService/NavigationModul";
import NavigationMobile from "@services/NavigationService/NavigationMobile";


interface NavProps {
  items: (Omit<NavItemProps, "divider"> | NavItemMegaNavProps)[];
}

const Nav: React.FC<NavProps> = ({ items }) => {
  const { toggleMenu, menuOpen, closeMenu } = useMenu();

  const handleNavClick = () => {
    toggleMenu();
  };
  return (
    <>
      <nav>
        <div className="flex items-center justify-between w-full py-2 pl-24 shadow-lg ">
          <Link href="/">
            <Logo />
          </Link>

          <div className="items-center justify-center hidden w-full lg:flex">
            <NavigationModul items={items} />
          </div>

       
            

          {/* <div className="hidden lg:block">
            <Button> Kontakt aufnehmen</Button>
          </div>
          */}
          <button
            data-testid="menu-overlay-toggle"
            onClick={handleNavClick}
            className="lg:hidden"
             aria-label="Open the Menu"
          >
            <Svg className="w-[30px]" icon="hamburger" />
          </button>
        </div>
      </nav>
      <NavigationMobile items={items} open={menuOpen} closeMenu={closeMenu} />
    </>
  );
};

export default Nav;
