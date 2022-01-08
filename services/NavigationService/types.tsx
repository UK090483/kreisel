import React from "react";
import { NavItemBaseProps } from "./components/NavigationItemBase";
import { NavigationLinkProps } from "./components/NavigationLink";

export interface NavItem {
  label?: string;
  items?: NavItem[];
  link?: {
    href?: string | null;
    external?: boolean;
  } | null;
  [key: string]: any;
}

export type NavigationItemBaseComponent = React.FC<NavItemBaseProps>;
export type NavigationLinkComponent = React.FC<NavigationLinkProps>;
