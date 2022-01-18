import React from "react";
import { useRouter } from "next/router";
import { NavItem } from "../types";

interface useIsActiveProps extends NavItem {}
const useIsActive = (props: useIsActiveProps) => {
  const { asPath } = useRouter();

  const isActive = (navItem: NavItem): boolean => {
    return checkActive(navItem, asPath);
  };

  const activeWithin = React.useMemo(() => {
    return props?.items && props?.items.find((i) => i.link?.href === asPath);
  }, [props?.items, asPath]);

  const active = checkActive(props, asPath);

  return {
    isActive,
    active,
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
