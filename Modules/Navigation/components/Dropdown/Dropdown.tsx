import { NavItem } from "../../types";
import React from "react";
import { useNavigation } from "../../NavigationContext";
import { NavigationLinkProps } from "../NavItem/NavigationLink";

interface DropdownProps {
  list?: NavItem[];
  items?: NavItem[];
  onClick?: () => void;
  NavigationLink?: React.ReactElement<NavigationLinkProps>;
}

const Dropdown: React.FC<DropdownProps> = ({ items, list, onClick }) => {
  return (
    <ul className="flex justify-between w-full">
      {list &&
        list.map((i) => (
          <List
            onClick={onClick}
            key={i.label}
            label={i.label}
            items={i.items}
          />
        ))}
      {items && <List onClick={onClick} items={items}></List>}
    </ul>
  );
};

export default Dropdown;

export const List: React.FC<{
  items?: NavItem[];
  label?: string;
  onClick?: () => void;
}> = (props) => {
  const { items, label, onClick } = props;
  const {
    NavItemBase: DefaultNavigationItemBase,
    NavItemLink: DefaultNavigationLink,
  } = useNavigation();

  return (
    <li>
      {label && (
        <DefaultNavigationItemBase props={props} place="header" bold>
          {label}
        </DefaultNavigationItemBase>
      )}
      <ul className="list-none">
        {items?.map(({ label, link }) => (
          <li key={label}>
            <DefaultNavigationLink onClick={onClick} {...link}>
              <DefaultNavigationItemBase props={props} place="link">
                {label}
              </DefaultNavigationItemBase>
            </DefaultNavigationLink>
          </li>
        ))}
      </ul>
    </li>
  );
};
