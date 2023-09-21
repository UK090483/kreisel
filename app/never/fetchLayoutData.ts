import { withTimeLog } from "@lib/utils";
import { sanityClient } from "@services/SanityService/sanity.server";
import {
  IFooterInfo,
  IFooterContact,
  footerInfoQuery,
  footerContactQuery,
  NavQuery,
  NavResult,
} from "PageBuilder/composedQueries";

const getLayoutData = async (navType: "mainNav" | "memberNav" = "mainNav") => {
  return sanityClient.fetch<
    {
      footerInfo: IFooterInfo;
      contact: IFooterContact;
    } & NavResult
  >(
    `*[_id == 'siteConfig'][0]{
          ${NavQuery(navType)}
          ${footerInfoQuery}
          ${footerContactQuery} 
      }
    `
  );
};

export default withTimeLog(
  getLayoutData,
  (id, type) => `fetch layoutData_${id} in`
);
