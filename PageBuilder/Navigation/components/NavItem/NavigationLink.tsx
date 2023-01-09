import React from "react";
import { Link } from "@components/Link";
import { NavItem } from "../../types";

export type NavigationLinkProps = NavItem["link"] & {
  onClick?: () => void;
  focus?: boolean;
};

const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
  const { children, external, onClick, href, focus } = props;

  return (
    <Link
      onClick={onClick}
      className={`flex items-center leading-none text-center ${
        focus ? "" : ""
      }`}
      href={href || "/"}
      external={external}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;
