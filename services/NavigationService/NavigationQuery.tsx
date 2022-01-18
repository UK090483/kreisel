// import {
//   linkQuery,
//   LinkResult,
// } from "@services/pageBuilderService/queries/snippets";
// import { NavigationItem, NavigationMegaMenu } from "types";

// export const navItemQuery = (locale: string = "") => `
//  _type == 'navigationItem' =>{
//     'label': coalesce(label_${locale}, label),
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

// export const NavigationMegaMenuQuery = (locale: string = "") => `
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

// export const navItemQuery2 = (locale: string = "") => `
//     'label': coalesce(label_${locale}, label),
//     'link':link{
//       ${linkQuery}
//     }
// `;

// export const NavigationQuery = (locale: string = "") => `
//  'navigation':*[_id == 'siteConfig'][0].mainNav[]{
//   ${navItemQuery2(locale)},
//   'items':items[]{
//     ${navItemQuery2(locale)},
//     'items':items[]{${navItemQuery2(locale)}}
//   }
//  }
// `;

// interface NavigationItemResult {
//   label?: string;
//   link?: LinkResult;
//   items?: NavigationItemResult[];
// }
// export interface NavigationResult {
//   navigation: NavigationItemResult[];
// }

// export interface NavItemResult extends Omit<NavigationItem, "link"> {
//   link: LinkResult;
// }

export {};
