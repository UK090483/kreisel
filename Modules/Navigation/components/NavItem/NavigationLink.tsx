import { Link } from "@components/Link";
import { NavItem } from "@services/NavigationService/types";
import React from "react";

export type NavigationLinkProps = NavItem["link"] & {
  onClick?: () => void;
};

const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
  const { children, external, onClick, href } = props;

  return (
    <Link
      onClick={onClick}
      className="flex items-center leading-none text-center "
      href={href || "/"}
      external={external}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;
