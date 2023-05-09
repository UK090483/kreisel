import { withTimeLog } from "@lib/utils";
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
  return sanityClient.fetch<{
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
});

export default withTimeLog(
  getLayoutData,
  (id, type) => `fetch layoutData_${id} in`
);
