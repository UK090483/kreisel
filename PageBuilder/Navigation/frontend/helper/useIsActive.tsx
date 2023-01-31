import { NavItem } from "../types";
interface useIsActiveProps extends NavItem {}
const useIsActive = (props: useIsActiveProps) => {
  const pathName =
    typeof window !== "undefined" ? window.location?.pathname : "";

  const isActive = (navItem: NavItem): boolean => {
    return checkActive(navItem, pathName);
  };

  return {
    isActive,
    active: checkActive(props, pathName),
  };
};

export default useIsActive;

const checkActive = (item: NavItem, asPath: string): boolean => {
  if (item.link) {
    return item.link.href === asPath;
  }

  if (item.items) {
    const res = item.items.find((i) => {
      return checkActive(i, asPath);
    });

    return !!res;
  }

  return false;
};
