import React from "react";
import Dropdown from "./Dropdown";
import prepareNavItems from "../../helper/prepareNavItems";
import { NavItem } from "../../types";

type NavigationModulDropdownContainerProps = {
  items: NavItem[];
  show: boolean;
  targetX: number;
  targetY: number;
  handleMouseLeave: () => void;
  handleMouseEnter: () => void;
};

// export const NavigationModulDropdownContainerOld: React.FC<
//   NavigationModulDropdownContainerProps
// > = ({ items, show, targetX, targetY, handleMouseLeave, handleMouseEnter }) => {
//   const prepared = React.useMemo(() => prepareNavItems(items), [items]);
//   const valid = items && items.length > 0;
//   if (!valid) return null;

//   return (
//     <>
//       {show && (
//         <div
//           onMouseLeave={handleMouseLeave}
//           onMouseEnter={handleMouseEnter}
//           style={{
//             top: targetY,
//             left: prepared.hasLists ? undefined : targetX,
//           }}
//           className={`fixed  animate-fadeInMenuItemFast p-4 flex items-center justify-between  bg-white  rounded-b-2xl    ${
//             prepared.hasLists
//               ? "left-[50%] transform -translate-x-1/2  min-w-[80vw]"
//               : ""
//           }  `}
//         >
//           <Dropdown
//             onClick={handleMouseLeave}
//             items={prepared.items}
//             list={prepared.list}
//           />
//         </div>
//       )}
//     </>
//   );
// };

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
          className={`fixed  animate-fadeInMenuItemFast p-4 flex items-center justify-between  bg-white  rounded-b-2xl  ${
            prepared.hasLists
              ? "left-[50%] transform -translate-x-1/2  min-w-[80vw]"
              : ""
          }  `}
        >
          <div className="absolute -z-10 shadow-lg  w-full left-0 right-0 bottom-0 top-4  rounded-b-2xl" />
          <div className="absolute -z-10  bg-white inset-0 rounded-b-2xl" />

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
