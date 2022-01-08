import { Link } from "@components/Link";
import Underline from "@components/Underline";
import React from "react";
import { NavItem } from "../types";
import { NavigationModulItemBase } from "./NavigationItemBase";

export type NavigationLinkProps = NavItem["link"] & { onClick?: () => void };

const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
  const { children, external, onClick, href } = props;
  console.log("NavigationLinkComponent2");

  return (
    <Link
      onClick={onClick}
      className="flex items-center leading-none text-center border-2 "
      href={href || "/"}
      external={external}
    >
      <Underline on="hover">
        <NavigationModulItemBase>{children}</NavigationModulItemBase>
      </Underline>
    </Link>
  );
};

export default NavigationLink;
