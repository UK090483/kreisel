import { NavItemBaseProps } from "./components/NavItem/NavigationItemBase";
import { NavigationLinkProps } from "./components/NavItem/NavigationLink";

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
