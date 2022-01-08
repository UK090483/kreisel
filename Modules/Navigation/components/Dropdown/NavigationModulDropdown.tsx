import { useNavigation } from "../../NavigationContext";
import React, { useRef } from "react";
import { NavItem } from "../../types";
import { NavigationModulDropdownContainer } from "./NavigationModulDropdownContainer";

type NavigationModulDropdownProps = {
  items?: NavItem[];
};

export const NavigationModulDropdown: React.FC<NavigationModulDropdownProps> = (
  props
) => {
  const { children, items } = props;
  const hasItems = items && items.length > 0;

  const [hover, setHover] = React.useState(false);
  const [bottom, setBottom] = React.useState<number>(0);
  const [target, setTarget] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    checkButtonPosition();
    setHover(true);
  };
  const handleMouseLeave = () => setHover(false);
  const handleNavClick = () => setHover(false);

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

  const { NavItemBase: DefaultNavigationItemBase } = useNavigation();

  if (!hasItems) return null;

  return (
    <>
      <button
        className="leading-none "
        type="button"
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
      >
        <DefaultNavigationItemBase
          props={props}
          place="dropdown"
          icon
          hover={hover}
        >
          {children}
        </DefaultNavigationItemBase>
      </button>
      <NavigationModulDropdownContainer
        handleMouseLeave={handleMouseLeave}
        handleMouseEnter={handleMouseEnter}
        show={hover}
        items={items}
        targetX={target.x}
        targetY={target.y}
      />
    </>
  );
};
