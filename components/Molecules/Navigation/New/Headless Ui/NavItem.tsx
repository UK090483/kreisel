import { INavItem } from "./NavigationMenu";
import Underline from "components/Atoms/Underline/Underline";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { useRef } from "react";

const navItemStyle = {
  padding: "px-6 py-4",
  bgColor: "bg-primary-xLight ",
};
const NavItem = ({
  label,
  items,
  link,
  level = 0,
}: INavItem & { level?: number }) => {
  if (!items && !link?.href) return null;

  if (!items) {
    return (
      // <RadixNavigationMenu.Item>
      //   <RadixNavigationMenu.Link
      //     asChild
      //     className={clsx(navItemStyle.padding, "whitespace-nowrap flex")}
      //   >
      <Link href={link?.href || "/"}>
        <Underline color="primary" on="hover">
          {label}
        </Underline>
      </Link>
      //   </RadixNavigationMenu.Link>
      // </RadixNavigationMenu.Item>
    );
  }

  if (level === 1) {
    return (
      <li>
        <h2
          className={clsx(navItemStyle.padding, "whitespace-nowrap font-bold")}
        >
          {label}
        </h2>
        <ul className={clsx("")}>
          {items.map((i, index) => {
            return <NavItem key={index} {...i} />;
          })}
        </ul>
      </li>
    );
  }

  const isMulti = items.every((i) => i.items);

  return (
    <PopMenu label={label}>
      <ul className={clsx(" p-6 ", { "flex ": isMulti })}>
        {items.map((i, index) => {
          return <NavItem key={index} {...i} level={1} />;
        })}
      </ul>
    </PopMenu>
  );
};

export default NavItem;

const PopMenu = ({
  label,
  children,
}: {
  label?: string;
  children: React.ReactElement;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const handleEnter: React.MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleLeave: React.MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    if (ref.current) {
      ref.current.click();
    }
  };

  return (
    <Popover
      className={"relative"}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Popover.Button
        ref={ref}
        className={clsx(
          navItemStyle.padding,
          "group flex select-none items-center justify-between gap-1"
        )}
      >
        <Underline color="primary" on="hover">
          {label}
        </Underline>
        <CaretDownIcon
          className="text-violet10  relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
          aria-hidden
        />
      </Popover.Button>
      <Transition
        enter="transition duration-700 ease-out"
        enterFrom="transform scale-75 opacity-0 -translate-x-20"
        enterTo="transform scale-100 opacity-100 translate-x-0"
        leave="transition duration-500 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-75 opacity-0"
      >
        <Popover.Panel
          onMouseLeave={handleLeave}
          className={clsx(
            navItemStyle.bgColor,
            "absolute top-0 left-0 rounded-lg"
          )}
        >
          {children}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
