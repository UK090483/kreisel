import { NavItem } from "../../types";
import React, { useRef } from "react";
import { useNavigation } from "../../NavigationContext";
import { NavigationLinkProps } from "../NavItem/NavigationLink";
import useIsActive from "../../helper/useIsActive";

interface DropdownProps {
  list?: NavItem[];
  items?: NavItem[];
  onClick?: () => void;
  NavigationLink?: React.ReactElement<NavigationLinkProps>;
}

const Dropdown: React.FC<DropdownProps> = ({ items, list, onClick }) => {
  const ref = useRef<HTMLUListElement | null>(null);
  return (
    <ul ref={ref} className=" flex justify-between w-full ">
      {list &&
        list.map((i, index) => (
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

  const { isActive } = useIsActive({});

  return (
    <li>
      {label && (
        <DefaultNavigationItemBase
          active={false}
          props={props}
          place="header"
          bold
        >
          {label}
        </DefaultNavigationItemBase>
      )}
      <ul className="list-none">
        {items?.map((props, index) => {
          const { label, link } = props;
          return (
            <li key={label}>
              <DefaultNavigationLink onClick={onClick} {...link}>
                <DefaultNavigationItemBase
                  active={isActive(props)}
                  props={props}
                  place="link"
                >
                  {label}
                </DefaultNavigationItemBase>
              </DefaultNavigationLink>
            </li>
          );
        })}
      </ul>
    </li>
  );
};
