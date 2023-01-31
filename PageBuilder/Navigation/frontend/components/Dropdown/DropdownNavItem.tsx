import { NavigationModulDropdownContainer } from "./NavigationModulDropdownContainer";
import { NavigationItemBaseComponent, NavItem } from "../../types";
import { useNavigationOpen } from "../../NavigationContext";
import useIsActive from "../../helper/useIsActive";
import DefaultNavigationItemBase from "../NavItem/NavigationItemBase";
import React, { useRef } from "react";

type NavigationModulDropdownProps = {
  items?: NavItem[];
  id: string;
  children?: React.ReactNode;
  NavigationItemBase?: NavigationItemBaseComponent;
};

const DropdownNavItem: React.FC<NavigationModulDropdownProps> = (props) => {
  const { children, items, id, NavigationItemBase } = props;
  const hasItems = items && items.length > 0;

  const NavigationItemBaseComponent = NavigationItemBase
    ? NavigationItemBase
    : DefaultNavigationItemBase;

  const { open, setOpen } = useNavigationOpen(id);
  const { active } = useIsActive({ items });

  const [bottom, setBottom] = React.useState<number>(0);
  const [target, setTarget] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const ref = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    checkButtonPosition();
    setOpen(id);
  };
  const handleMouseLeave = () => setOpen(null);

  const handleNavClick = () => {
    if (open) {
      return setOpen(null);
    }
    setOpen(id);
    checkButtonPosition();
  };

  const checkButtonPosition = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.bottom !== bottom) {
        setBottom(rect.bottom);
      }
      if (rect.bottom !== target.y || rect.left + rect.width / 2 !== target.x) {
        setTarget({ x: rect.left + rect.width / 2, y: rect.bottom });
      }
    }
  };

  if (!hasItems) return null;

  return (
    <>
      <button
        id={id}
        aria-haspopup={true}
        aria-expanded={open}
        className="leading-none whitespace-nowrap"
        type="button"
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleNavClick}
        data-testid={"DropdownNavItem_" + id}
      >
        <NavigationItemBaseComponent
          active={active}
          props={props}
          place="dropdown"
          icon
          hover={open}
        >
          {children}
        </NavigationItemBaseComponent>
      </button>
      <NavigationModulDropdownContainer
        ref={wrapRef}
        handleMouseLeave={handleMouseLeave}
        handleMouseEnter={handleMouseEnter}
        show={open}
        items={items}
        targetX={target.x}
        targetY={target.y}
      />
    </>
  );
};

export default DropdownNavItem;
