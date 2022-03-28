import Portal from "@components/Portal";
import Svg from "@components/Svg";
import useAnimationDelay from "@hooks/useAnimationDelay";
import React from "react";
import { useLockBodyScroll } from "react-use";
import DefaultNavigationItemBase from "./components/NavItem/NavigationItemBase";
import DefaultNavigationLink from "./components/NavItem/NavigationLink";
import {
  NavigationItemBaseComponent,
  NavigationLinkComponent,
  NavItem,
} from "./types";

export interface NavigationMobileProps {
  label?: string;
  className?: string;
  open?: boolean;
  items?: NavItem[];
  closeMenu?: () => void;
  NavigationLink?: NavigationLinkComponent;
  NavigationItemBase?: NavigationItemBaseComponent;
}

const NavigationMobile: React.FC<NavigationMobileProps> = ({
  open,
  items,
  closeMenu,
  NavigationLink,
  NavigationItemBase,
}) => {
  const NavigationLinkComponent = NavigationLink
    ? NavigationLink
    : DefaultNavigationLink;

  const NavigationItemBaseComponent = NavigationItemBase
    ? NavigationItemBase
    : DefaultNavigationItemBase;

  const { render, animation } = useAnimationDelay({
    delay: 300,
    listener: open,
  });

  const [overlays, setOverlays] = React.useState<NavItem[]>([]);

  React.useEffect(() => {
    if (!open) {
      setOverlays([]);
    }
  }, [open]);

  const handleClick = (type: string, item: NavItem) => {
    if (type === "link" && closeMenu) {
      return closeMenu();
    }
    setOverlays((i) => [...i, item]);
  };

  const handleBackClick = () => {
    setOverlays((i) => i.slice(0, -1));
  };
  useLockBodyScroll(render);

  return (
    <>
      {render && (
        <Portal>
          <div
            className={`flex flex-col items-center justify-center h-screen bg-primary  fixed inset-0  z-10  transition-all transform duration-300 ${
              animation
                ? " translate-y-0 opacity-100 "
                : "-translate-y-96  opacity-0"
            }`}
          >
            {items &&
              items.map((item, index) => {
                return (
                  <ConditionalButton
                    onClick={(type) => handleClick(type, item)}
                    key={item.label}
                    {...item}
                    NavigationItemBase={NavigationItemBaseComponent}
                    NavigationLink={NavigationLinkComponent}
                  />
                );
              })}

            {overlays &&
              overlays.map((item) => {
                return (
                  <div
                    key={item.label}
                    className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-primary animate-fadeInFast"
                  >
                    <button
                      className="absolute transform rotate-180 top-32 right-6 "
                      onClick={handleBackClick}
                    >
                      <Svg icon="chevronRight" />
                    </button>

                    {item.items &&
                      item.items.map((item) => {
                        return (
                          <ConditionalButton
                            key={item.label}
                            onClick={(type) => handleClick(type, item)}
                            {...item}
                            NavigationItemBase={NavigationItemBaseComponent}
                            NavigationLink={NavigationLinkComponent}
                          />
                        );
                      })}
                  </div>
                );
              })}
          </div>
        </Portal>
      )}
    </>
  );
};

const ConditionalButton: React.FC<
  NavItem & {
    onClick: (type: "link" | "item") => void;
    NavigationLink?: NavigationLinkComponent;
    NavigationItemBase?: NavigationItemBaseComponent;
  }
> = (props) => {
  const { label, onClick, NavigationLink, NavigationItemBase } = props;

  const NavigationLinkComponent = NavigationLink
    ? NavigationLink
    : DefaultNavigationLink;

  const NavigationItemBaseComponent = NavigationItemBase
    ? NavigationItemBase
    : DefaultNavigationItemBase;

  const hasChildren = props.items && props.items.length > 0;
  return hasChildren ? (
    <button onClick={() => onClick("item")}>
      <NavigationItemBaseComponent active={true} icon props={props}>
        {label}
      </NavigationItemBaseComponent>
    </button>
  ) : (
    <NavigationLinkComponent onClick={() => onClick("link")} {...props.link}>
      {label}
    </NavigationLinkComponent>
  );
};

export default NavigationMobile;
