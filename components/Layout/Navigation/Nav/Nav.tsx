/* eslint-disable @next/next/no-img-element */
import Svg from "@components/Svg";
import React from "react";

import { Link } from "@components/Link";

import useMenu from "@services/StoreService/hooks/useMenu";

import { Logo } from "@components/Layout/Logo";
import { NavigationModul } from "@services/NavigationService/NavigationModul";
import NavigationMobile from "@services/NavigationService/NavigationMobile";
import { NavItem } from "@services/NavigationService/types";
import NavigationLink from "@services/NavigationService/components/NavigationLink2";
import NavItemBase from "@services/NavigationService/components/NavigationItemBase2";
import { HeaderNavigation } from "Modules/Navigation";
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
      <nav className=" shadow-lg ">
        <div className=" mx-auto lg:container  flex items-center justify-between w-full py-2  ">
          <Link href="/">
            <Logo />
          </Link>

          <div className="items-center justify-center hidden w-full lg:flex">
            <HeaderNavigation items={items} />
            {/* <NavigationModul items={items} /> */}
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
