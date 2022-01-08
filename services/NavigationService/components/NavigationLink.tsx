import { Link } from "@components/Link";
import Underline from "@components/Underline";
import React from "react";
import { NavigationItemBaseComponent, NavItem } from "../types";
import NavigationItemBase from "./NavigationItemBase";
import DefaultNavigationItemBase, {
  NavigationModulItemBase,
} from "./NavigationItemBase";

export type NavigationLinkProps = NavItem["link"] & {
  onClick?: () => void;
  NavigationItemBase?: NavigationItemBaseComponent;
};

const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
  const { children, external, onClick, href, NavigationItemBase } = props;

  const NavigationItemBaseComponent = NavigationItemBase
    ? NavigationItemBase
    : DefaultNavigationItemBase;

  return (
    <Link
      onClick={onClick}
      className="flex items-center leading-none text-center "
      href={href || "/"}
      external={external}
    >
      <Underline on="hover">
        <NavigationItemBaseComponent>{children}</NavigationItemBaseComponent>
      </Underline>
    </Link>
  );
};

export default NavigationLink;
