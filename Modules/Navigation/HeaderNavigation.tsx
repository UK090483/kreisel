import React from "react";
import NavigationItem from "./components/NavItem/NavigationItem";
import { NavigationContextProvider } from "./NavigationContext";

import {
  NavigationItemBaseComponent,
  NavigationLinkComponent,
  NavItem,
} from "./types";

interface Props {
  items: NavItem[];
  NavigationLink?: NavigationLinkComponent;
  NavigationItemBase?: NavigationItemBaseComponent;
  className?: string;
}

export const HeaderNavigation = (props: Props) => {
  const { items, NavigationLink, className, NavigationItemBase } = props;
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

export default HeaderNavigation;
