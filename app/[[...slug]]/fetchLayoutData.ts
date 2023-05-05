import { sanityClient } from "@services/SanityService/sanity.server";
import {
  IFooterInfo,
  IFooterContact,
  footerInfoQuery,
  footerContactQuery,
} from "PageBuilder/Layout/Footer/Footer.query";
import { navItemQuery2 } from "PageBuilder/Navigation/navigation.query";
import { cache } from "react";

const getLayoutData = cache(async (navType: "mainNav" | "memberNav") => {
  const c = Math.random().toString().slice(3, 7);
  // eslint-disable-next-line no-console
  console.time(`layoutFetch-${c} took`);
  const result = await sanityClient.fetch<{
    nav: any;
    footerInfo: IFooterInfo;
    contact: IFooterContact;
  }>(
    `*[_id == 'siteConfig'][0]{
         'nav': ${navType}[]{
            ${navItemQuery2()},
              'items':items[]{
                ${navItemQuery2()},
                'items':items[]{
                  ${navItemQuery2()},
                }
              }
          },
          ${footerInfoQuery}
          ${footerContactQuery} 
      }
    `
  );
  // eslint-disable-next-line no-console
  console.timeEnd(`layoutFetch-${c} took`);
  return result;
});

export default getLayoutData;
