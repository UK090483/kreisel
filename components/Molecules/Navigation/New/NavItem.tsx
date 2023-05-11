import { INavItem } from "./NavigationMenu";
import Underline from "components/Atoms/Underline/Underline";
import { CaretDownIcon } from "@radix-ui/react-icons";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import clsx from "clsx";
import Link from "next/link";

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
      <RadixNavigationMenu.Item>
        <RadixNavigationMenu.Link
          asChild
          className={clsx(navItemStyle.padding, "whitespace-nowrap flex")}
        >
          <Link href={link?.href || "/"}>
            <Underline color="primary" on="hover">
              {label}
            </Underline>
          </Link>
        </RadixNavigationMenu.Link>
      </RadixNavigationMenu.Item>
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
    <RadixNavigationMenu.Item className="relative">
      <RadixNavigationMenu.Trigger
        className={clsx(
          navItemStyle.padding,
          "group flex select-none items-center justify-between gap-1"
        )}
      >
        <Underline color="primary" on="hover">
          {label}
        </Underline>
        <CaretDownIcon
          className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
          aria-hidden
        />
      </RadixNavigationMenu.Trigger>

      <RadixNavigationMenu.Content
        className={clsx(
          navItemStyle.bgColor,
          "absolute top-12 left-0 rounded-lg",
          "animate-fadeIn data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight"
        )}
      >
        <ul className={clsx(" p-6 ", { "flex ": isMulti })}>
          {items.map((i, index) => {
            return <NavItem key={index} {...i} level={1} />;
          })}
        </ul>
      </RadixNavigationMenu.Content>
    </RadixNavigationMenu.Item>
  );
};

export default NavItem;
