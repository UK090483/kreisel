import { NavItem } from "../../types";
import { Link } from "components/Link";
import React from "react";

export type NavigationLinkProps = NavItem["link"] & {
  onClick?: () => void;
  focus?: boolean;
  children?: React.ReactNode;
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
