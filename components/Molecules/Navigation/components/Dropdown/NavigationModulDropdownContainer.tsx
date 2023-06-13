"use client";
import Dropdown from "./Dropdown";
import prepareNavItems from "../../helper/prepareNavItems";
import { NavItem } from "../../types";
import React from "react";

type NavigationModulDropdownContainerProps = {
  items: NavItem[];
  show: boolean;
  targetX: number;
  targetY: number;
  handleMouseLeave: () => void;
  handleMouseEnter: () => void;
};

const Render: React.ForwardRefRenderFunction<
  HTMLDivElement,
  NavigationModulDropdownContainerProps
> = (props, ref) => {
  const { items, show, targetX, targetY, handleMouseLeave, handleMouseEnter } =
    props;
  const prepared = React.useMemo(() => prepareNavItems(items), [items]);
  const valid = items && items.length > 0;
  if (!valid) return null;

  return (
    <>
      {show && (
        <div
          ref={ref}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          style={{
            top: targetY,
            left: prepared.hasLists ? undefined : targetX,
          }}
          className={`fixed flex animate-fadeInMenuItemFast items-center justify-between p-4  ${
            prepared.hasLists
              ? "left-[50%] min-w-[80vw] -translate-x-1/2  transform"
              : ""
          }  `}
        >
          {/* <div className="absolute left-0 right-0 bottom-0 top-4 -z-10 w-full rounded-b-2xl  shadow-lg" />
          <div className="absolute top-6 left-0 right-0 bottom-0  -z-10 rounded-2xl bg-white " /> */}

          <Dropdown
            onClick={handleMouseLeave}
            items={prepared.items}
            list={prepared.list}
          />
        </div>
      )}
    </>
  );
};

export const NavigationModulDropdownContainer = React.forwardRef<
  HTMLDivElement,
  NavigationModulDropdownContainerProps
>(Render);
