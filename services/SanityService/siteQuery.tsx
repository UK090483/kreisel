// import {
//   linkQuery,
//   LinkResult,
// } from "@services/pageBuilderService/queries/snippets";
// import { NavigationItem, NavigationMegaMenu } from "types";

// const navItemQuery = `
//  _type == 'navigationItem' =>{
//       ...,
//     'link':link{
//       ${linkQuery}
//     }
//   }
// `;

// export interface NavigationMegaMenuResult
//   extends Omit<NavigationMegaMenu, "items"> {
//   items: {
//     label?: string;
//     link?: LinkResult;
//   }[];
// }

// export const NavigationMegaMenuQuery = `
//  _type == 'navigationMegaMenu' =>{
//       'items':items[]{
//        ...,

//        'link':link{
//         ${linkQuery}
//       },
//        'items':items[]{
//          ...,
//         'link':link{
//           ${linkQuery}
//         }
//       }
//     }
//   }
// `;

// interface NavItemResult extends Omit<NavigationItem, "link"> {
//   link: LinkResult;
// }

// export const siteQuery = `
// 'siteSettings': *[_id == 'siteConfig'][0]{
//   'mainNav':mainNav[]{
//     ...,
//     ${navItemQuery},
//     ${NavigationMegaMenuQuery}
//   },
// }
// `;

// export interface SiteSettingResult {
//   siteSettings: {
//     mainNav: (NavItemResult | NavigationMegaMenuResult)[];
//     extraNav: NavItemResult[];
//   };
// }

export {};
