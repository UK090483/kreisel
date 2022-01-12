import { NavItem } from "../../types";
import React, { useRef, useState } from "react";
import { useNavigation } from "../../NavigationContext";
import { NavigationLinkProps } from "../NavItem/NavigationLink";

interface DropdownProps {
  list?: NavItem[];
  items?: NavItem[];
  onClick?: () => void;
  NavigationLink?: React.ReactElement<NavigationLinkProps>;
}

const Dropdown: React.FC<DropdownProps> = ({ items, list, onClick }) => {
  const ref = useRef<HTMLUListElement | null>(null);
  const [focusList, setFocusList] = useState(0);
  const [focusItem, setFocusItem] = useState(0);

  React.useEffect(() => {
    // if (ref.current) {
    //   const links = ref.current.querySelectorAll("a");

    //   links.forEach((i) => {
    //     i.addEventListener("focus", () => {
    //       setFucusWithin(true);
    //     });

    //     i.addEventListener("blur", () => {
    //       setFucusWithin(false);
    //     });
    //   });
    // }

    const handleKeypress = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();

        if (e.key === "ArrowDown") {
          setFocusItem((i) => i + 1);
        }

        if (e.key === "ArrowUp") {
          setFocusItem((i) => i - 1);
        }
      }
    };
    document.addEventListener("keydown", handleKeypress);
    return () => {
      document.removeEventListener("keydown", handleKeypress);
    };
  }, []);

  return (
    <ul ref={ref} className="flex justify-between w-full">
      {list &&
        list.map((i, index) => (
          <List
            onClick={onClick}
            key={i.label}
            label={i.label}
            items={i.items}
            focus={index === focusList}
            focusItem={focusItem}
          />
        ))}
      {items && (
        <List
          onClick={onClick}
          items={items}
          focus={true}
          focusItem={focusItem}
        ></List>
      )}
    </ul>
  );
};

export default Dropdown;

export const List: React.FC<{
  items?: NavItem[];
  label?: string;
  focus?: boolean;
  focusItem?: number;
  onClick?: () => void;
}> = (props) => {
  const { items, label, onClick, focus, focusItem } = props;
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
        {items?.map(({ label, link }, index) => (
          <li key={label}>
            <DefaultNavigationLink
              onClick={onClick}
              {...link}
              focus={focus && focusItem === index}
            >
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
