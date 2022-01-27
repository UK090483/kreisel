import { useNavigation } from "../../NavigationContext";
import React, { useEffect, useRef } from "react";
import { NavItem } from "../../types";
import { NavigationModulDropdownContainer } from "./NavigationModulDropdownContainer";
import useIsActive from "../../helper/useIsActive";
import NavigationItemBase from "../NavItem/NavigationItemBase";

type NavigationModulDropdownProps = {
  items?: NavItem[];
};

export const NavigationModulDropdown: React.FC<NavigationModulDropdownProps> = (
  props
) => {
  const { children, items } = props;
  const hasItems = items && items.length > 0;

  const [hover, setHover] = React.useState(false);

  const { active } = useIsActive({ items });

  const [bottom, setBottom] = React.useState<number>(0);
  const [target, setTarget] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const ref = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkFocus = () => {
      let res =
        wrapRef.current?.contains(document.activeElement) ||
        document.activeElement === ref.current;
      if (!res) {
        setHover(false);
      }
    };
    const handleKeydown = () => {
      checkFocus();
    };
    if (hover) {
      document.addEventListener("keyup", handleKeydown);
    } else {
      document.removeEventListener("keyup", handleKeydown);
    }
    return () => {
      document.removeEventListener("keyup", handleKeydown);
    };
  }, [hover]);

  const handleMouseEnter = () => {
    checkButtonPosition();
    setHover(true);
  };
  const handleMouseLeave = () => setHover(false);
  const handleNavClick = () => {
    setHover((i) => !i);
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

  const { NavItemBase: DefaultNavigationItemBase } = useNavigation();

  if (!hasItems) return null;

  return (
    <>
      <button
        aria-haspopup={true}
        aria-expanded={hover}
        className="leading-none"
        type="button"
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleNavClick}
      >
        <NavigationItemBase
          active={active}
          props={props}
          place="dropdown"
          icon
          hover={hover}
        >
          {children}
        </NavigationItemBase>
      </button>
      <NavigationModulDropdownContainer
        ref={wrapRef}
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
