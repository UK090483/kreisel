import { linkQuery, LinkResult } from "PageBuilder/baseQueries";

const navItemQuery = (locale: string = "") => `
   _type == 'navigationItem' =>{
      'label': coalesce(label_${locale}, label),
      'link':link{
        ${linkQuery}
      }
    }
  `;

interface NavigationMegaMenuResult {
  items: {
    label?: string;
    link?: LinkResult;
  }[];
}

const NavigationMegaMenuQuery = (locale: string = "") => `
   _type == 'navigationMegaMenu' =>{
        'items':items[]{
         ...,
         'link':link{
          ${linkQuery}
        },
         'items':items[]{
           ...,
          'link':link{
            ${linkQuery}
          }
        }  
      }
    }
  `;

export const navItemQuery2 = (locale: string = "") => `
      'label': coalesce(label_${locale}, label),
      'link':link{
        ${linkQuery}
      } 
  `;

export const NavigationQuery = (locale: string = "") => `
   'navigation':select(
    pageType._ref == "bc359bcc-db23-4283-bc9f-591e3a9f44a3" || _id == "84c459c1-6443-45ec-b8be-131441a8efd4" =>  *[_id == 'siteConfig'][0].memberNav,
    *[_id == 'siteConfig'][0].mainNav
    )[]{
    ${navItemQuery2(locale)},
    'items':items[]{
      ${navItemQuery2(locale)},
      'items':items[]{${navItemQuery2(locale)}}
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
