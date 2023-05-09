import { INavItem } from "./NavigationMenu";

export const linkItem = (overwrite?: INavItem) =>
  ({
    label: "Test Item",
    link: { href: "testLink" },
    ...overwrite,
  } as INavItem);

export const listItem = (overwrite?: INavItem) =>
  ({
    label: "List Test Item",
    items: [
      linkItem({ label: "listitem 1", link: { href: "testLink1" } }),
      linkItem({ label: "listitem 2", link: { href: "testLink2" } }),
    ],
    ...overwrite,
  } as INavItem);

// eslint-disable-next-line import/no-unused-modules
export const MultiListItem = (overwrite?: INavItem) =>
  ({
    label: "MultiList Test Item",
    items: [
      linkItem({
        label: "MultiList 1",
        items: [
          linkItem({ label: "listitem 1", link: { href: "testLink1" } }),
          linkItem({ label: "listitem 1", link: { href: "testLink1" } }),
        ],
      }),
      linkItem({
        label: "MultiList 2",
        link: { href: "testLink2" },
        items: [
          linkItem({ label: "listitem 1", link: { href: "testLink1" } }),
          linkItem({ label: "listitem 1", link: { href: "testLink1" } }),
        ],
      }),
    ],
    ...overwrite,
  } as INavItem);

const item: INavItem = { label: "LinkItem" };

export const testData = [];
