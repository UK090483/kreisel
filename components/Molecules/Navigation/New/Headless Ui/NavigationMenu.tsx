"use client";
import NavItem from "./NavItem";
import React from "react";

export interface INavItem {
  label?: string;
  items?: INavItem[];
  link?: {
    href?: string | null;
    external?: boolean;
  } | null;
  [key: string]: any;
}

const NavigationMenu = ({ items }: { items: INavItem[] }) => {
  const [left, setLeft] = React.useState(0);

  if (!items || items.length === 0) return null;

  return (
    <ul className="flex">
      {items.map((i) => (
        <NavItem key={i.link?.href} {...i} />
      ))}
    </ul>
  );
};

export default NavigationMenu;
