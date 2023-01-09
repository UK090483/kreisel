export const linkQuery = `
 'href': select(
            defined(internalLink) && defined(internalLink->pageType) && defined(onPage)  => '/'+ internalLink->pageType->slug.current + '/' + internalLink->slug.current + '#'+ onPage,
            defined(internalLink) && defined(internalLink->pageType)  => '/'+ internalLink->pageType->slug.current + '/' + internalLink->slug.current,
            defined(internalLink) && defined(onPage) => '/'+ internalLink->slug.current + '#'+ onPage,
            defined(internalLink) => '/'+ internalLink->slug.current,
            defined(externalLink)  => externalLink,
          ),
  'external': select(defined(externalLink)=>true,defined(internalLink)=>false),
  onPage,
`;

export interface LinkResult {
  internalLink?: string | null;
  href?: string | null;
  external?: boolean;
  onPage?: string | null;
}

export const navItemQuery = (locale: string = "") => `
   _type == 'navigationItem' =>{
      'label': coalesce(label_${locale}, label),
      'link':link{
        ${linkQuery}
      }
    }
  `;

export interface NavigationMegaMenuResult {
  items: {
    label?: string;
    link?: LinkResult;
  }[];
}

export const NavigationMegaMenuQuery = (locale: string = "") => `
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
    pageType._ref == "bc359bcc-db23-4283-bc9f-591e3a9f44a3" =>  *[_id == 'siteConfig'][0].memberNav,
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

export interface NavItemResult {
  link: LinkResult;
}
