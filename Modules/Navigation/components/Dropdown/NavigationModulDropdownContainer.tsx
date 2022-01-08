import Dropdown from "./Dropdown";
import prepareNavItems from "../../helper/prepareNavItems";
import { NavItem } from "../../types";

export const NavigationModulDropdownContainer: React.FC<{
  items: NavItem[];
  show: boolean;
  targetX: number;
  targetY: number;
  handleMouseLeave: () => void;
  handleMouseEnter: () => void;
}> = ({
  items,
  show,
  targetX,
  targetY,
  handleMouseLeave,
  handleMouseEnter,
}) => {
  const valid = items && items.length > 0;
  if (!valid) return null;

  const prepared = prepareNavItems(items);

  return (
    <>
      {show && (
        <div
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          style={{
            top: targetY,
            left: prepared.hasLists ? undefined : targetX,
          }}
          className={`fixed  animate-fadeInMenuItemFast p-4 flex items-center justify-between  bg-white shadow-t  rounded-b-2xl  ${
            prepared.hasLists
              ? "left-[50%] transform -translate-x-1/2  min-w-[80vw]"
              : ""
          }  `}
        >
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
