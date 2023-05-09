"use client";
import NavigationItem from "./components/NavItem/NavigationItem";
import NavigationItemBase, {
  NavItemBaseProps,
} from "./components/NavItem/NavigationItemBase";
import { NavigationContextProvider } from "./NavigationContext";

import {
  NavigationItemBaseComponent,
  NavigationLinkComponent,
  NavItem,
} from "./types";
import Underline from "components/Underline/Underline";
import clsx from "clsx";
import React from "react";

interface Props {
  items: NavItem[];
  NavigationLink?: NavigationLinkComponent;
  NavigationItemBase?: NavigationItemBaseComponent;
  className?: string;
}

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

export const HeaderNavigation = (props: Props) => {
  const {
    items,
    NavigationLink,
    className,
    NavigationItemBase = NavItemBaseWithUnderline,
  } = props;
  const hasItems = !!items && items.length > 0;
  if (!hasItems) return <div>Missing NavItems</div>;

  return (
    <NavigationContextProvider
      NavItemBase={NavigationItemBase}
      NavItemLink={NavigationLink}
    >
      <div className={className || "flex"}>
        {items.map((i, index) => (
          <NavigationItem
            key={index}
            {...i}
            NavigationItemBase={NavigationItemBase}
            NavigationLink={NavigationLink}
          />
        ))}
      </div>
    </NavigationContextProvider>
  );
};
