import { NavItem } from "../types";

const prepareNavItems = (items: NavItem[]) => {
  const b = items.reduce(
    (acc, item) => {
      if (item.items) {
        return { ...acc, list: [...acc.list, item] };
      }
      return { ...acc, items: [...acc.items, item] };
    },
    { list: [], items: [] } as { list: NavItem[]; items: NavItem[] }
  );
  return { ...b, hasLists: b.list.length > 0, hasItems: b.items.length > 0 };
};

export default prepareNavItems;
