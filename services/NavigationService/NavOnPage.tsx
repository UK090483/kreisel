import React from "react";
import { NavigationModulItemBase } from "./components/NavigationItemBase";
import Dropdown from "./components/NavigationModulDropdown/Dropdown";
import prepareNavItems from "./helper/prepareNavItems";
import { NavItem } from "./types";

interface Props {
  items: NavItem[];
  className?: string;
}

export const NavOnPage: React.FC<Props> = (props) => {
  const { list, hasLists } = prepareNavItems(props.items || []);
  return (
    <ul
      className={`flex flex-wrap w-full justify-between ${
        props.className ? props.className : ""
      }`}
    >
      {hasLists &&
        list.map((item, index) => {
          const { list, items } = prepareNavItems(item.items || []);
          return (
            <li key={item.label} className="m-2 ">
              <NavigationModulItemBase bold icon hover>
                {item.label}
              </NavigationModulItemBase>
              <Dropdown list={list} items={items} />
            </li>
          );
        })}
    </ul>
  );
};
