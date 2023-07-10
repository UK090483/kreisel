"use client";

import NavigationItemBase from "./components/NavItem/NavigationItemBase";
import NavigationLink from "./components/NavItem/NavigationLink";
import {
  NavigationItemBaseComponent,
  NavigationLinkComponent,
  NavItem,
} from "./types";
import Portal from "components/Atoms/Portal";
import Svg from "components/Atoms/Svg";
import useAnimationDelay from "hooks/useAnimationDelay";
import React from "react";
import { useLockBodyScroll } from "react-use";
import * as Accordion from "@radix-ui/react-accordion";

import clsx from "clsx";

interface NavigationMobileProps {
  label?: string;
  className?: string;
  open?: boolean;
  items?: NavItem[];
  closeMenu?: () => void;
  NavigationLink?: NavigationLinkComponent;
  NavigationItemBase?: NavigationItemBaseComponent;
  children?: React.ReactNode;
}

const NavigationMobile: React.FC<NavigationMobileProps> = ({
  open,
  items,
  closeMenu,
  NavigationLink,
  NavigationItemBase,
  children,
}) => {
  const { render, animation } = useAnimationDelay({
    delay: 300,
    listener: open,
  });

  useLockBodyScroll(render);

  const handleClick = React.useCallback(() => {
    if (closeMenu) {
      closeMenu();
    }
  }, [closeMenu]);

  return (
    <>
      {render && (
        <Portal>
          <div
            className={`fixed inset-0 z-10 flex transform flex-col items-center overflow-scroll bg-primary-light pt-32 pb-24  transition-transform duration-300 ${
              animation
                ? "translate-y-0 opacity-100 "
                : "-translate-y-96  opacity-0"
            }`}
          >
            <NestedAccordion items={items} onClick={handleClick} />

            {children}
          </div>
        </Portal>
      )}
    </>
  );
};

interface NestedAccordionProps {
  items?: NavItem[];
  level?: number;
  onClick: () => void;
}

const NestedAccordion = (props: NestedAccordionProps) => {
  const { items, level = 0, onClick } = props;

  return (
    <Accordion.Root type="multiple" className="w-[300px]">
      {items?.map(({ label, link, _key, items }) => {
        if (link) {
          return (
            <NavigationLink key={_key} {...link} onClick={onClick}>
              <NavigationItemBase
                active={true}
                props={props}
                className={clsx("", {
                  "bg-primary-xLight rounded-theme py-3.5 mb-2": level === 0,
                })}
              >
                {label}
              </NavigationItemBase>
            </NavigationLink>
          );
        }

        if (items && items.length > 0) {
          return (
            <Accordion.Item
              key={_key}
              value={_key}
              className={clsx(" overflow-hidden ", {
                "bg-primary-xLight rounded-theme mb-2": level === 0,
                "bg-white": level === 1,
              })}
            >
              <Accordion.Header>
                <Accordion.Trigger className="group w-full ">
                  <NavigationItemBase
                    active={true}
                    props={props}
                    className={clsx("flex justify-between items-center", {
                      "group-data-[state=open]:bg-primary": level === 1,
                    })}
                  >
                    {label}
                    <Svg
                      icon="chevronRight"
                      className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-90"
                    />
                  </NavigationItemBase>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className={clsx("", { "": level === 1 })}>
                <NestedAccordion
                  onClick={onClick}
                  items={items}
                  level={level + 1}
                />
              </Accordion.Content>
            </Accordion.Item>
          );
        }
      })}
    </Accordion.Root>
  );
};

export default NavigationMobile;
