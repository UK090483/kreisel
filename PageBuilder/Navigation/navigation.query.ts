import { linkQuery, LinkResult } from "PageBuilder/baseQueries";

interface NavigationMegaMenuResult {
  items: {
    label?: string;
    link?: LinkResult;
  }[];
}

const navItemQuery = (locale: string = "") => `
      'label': coalesce(label_${locale}, label),
      'link':link{
        ${linkQuery}
      } 
  `;

export const NavQuery = (navType: string) => `
'nav': ${navType}[]{
  ${navItemQuery()},
    'items':items[]{
      ${navItemQuery()},
      'items':items[]{
        ${navItemQuery()},
      }
    }
},

`;

export interface NavResult {
  nav?: NavigationItemResult[];
}

export const NavigationQuery = `
   'navigation':select(
    pageType._ref == "bc359bcc-db23-4283-bc9f-591e3a9f44a3" || _id == "84c459c1-6443-45ec-b8be-131441a8efd4" =>  *[_id == 'siteConfig'][0].memberNav,
    *[_id == 'siteConfig'][0].mainNav
    )[]{
    ${navItemQuery("")},
    'items':items[]{
      ${navItemQuery("")},
      'items':items[]{${navItemQuery("")}}
    }
   }
  `;

interface NavigationItemResult {
  label?: string;
  link?: LinkResult;
  items?: NavigationItemResult[];
}
export interface NavigationResult {
  navigation: NavigationItemResult[];
}

interface NavItemResult {
  link: LinkResult;
}
