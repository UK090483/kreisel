// import { NavItem } from "../types";

// export const linkItem = (overwrite?: Partial<NavItem>) =>
//   ({
//     _key: Math.random(),
//     label: "Test Item",
//     link: { href: "testLink" },
//     ...overwrite,
//   } as NavItem);

// export const listItem = (overwrite?: NavItem) =>
//   ({
//     label: "List Test Item",
//     items: [
//       linkItem({ label: "listitem 1", link: { href: "testLink1" } }),
//       linkItem({ label: "listitem 2", link: { href: "testLink2" } }),
//     ],
//     ...overwrite,
//   } as NavItem);

// // eslint-disable-next-line import/no-unused-modules
// export const MultiListItem = (overwrite?: NavItem) =>
//   ({
//     label: "MultiList Test Item",
//     items: [
//       linkItem({
//         label: "MultiList 1",
//         items: [
//           linkItem({ label: "listitem 1", link: { href: "testLink1" } }),
//           linkItem({ label: "listitem 1", link: { href: "testLink1" } }),
//         ],
//       }),
//       linkItem({
//         label: "MultiList 2",
//         link: { href: "testLink2" },
//         items: [
//           linkItem({ label: "listitem 1", link: { href: "testLink1" } }),
//           linkItem({ label: "listitem 1", link: { href: "testLink1" } }),
//         ],
//       }),
//     ],
//     ...overwrite,
//   } as NavItem);

// export const testData = [];
