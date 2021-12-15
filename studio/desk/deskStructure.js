import S from "@sanity/desk-tool/structure-builder";
import client from "part:@sanity/base/client";
import { CgWebsite } from "react-icons/cg";
import { MdSettings } from "react-icons/md";
export default () =>
  S.list()
    .title("Base")
    .items([
      S.listItem()
        .title("Settings")
        .icon(MdSettings)
        .child(
          S.list()
            .id("settings")
            .title("Settings")
            .items([
              S.documentListItem()
                .schemaType("siteConfig")
                .title("Configuration")
                .id("siteConfig"),
              S.documentListItem()
                .schemaType("pageType")
                .title("Page Types")
                .child(S.documentTypeList("pageType")),
            ])
        ),
      S.listItem().title('Pages').icon(CgWebsite).child(
       S.documentTypeList('page')
      ),
      S.listItem().title('Articles').child(
        S.documentTypeList('article')
       ),

       S.listItem().title('Blog').child(
        S.documentTypeList('page').filter("pageType->slug.current == 'blog'")
       ),
       S.listItem().title('Aktuelles').child(
        S.documentTypeList('page').filter("pageType->slug.current == 'aktuelles'")
       ),

      // S.listItem()
      //   .title("Pages")
      //   .icon(CgWebsite)
      //   .child(
      //     S.documentTypeList("pageType")
      //       .filter(
      //         `_type ==  "pageType" || (_type == "page" && !defined(pageType)) `
      //       )
      //       .title("Pages")

      //       .child(async (pageTypeId, d) => {
      //         const isPage = await client.fetch(
      //           `*[_type == "page" && _id  == '${pageTypeId}'][0]`
      //         );

      //         if (isPage) {
      //           return S.document().id(pageTypeId);
      //         }

      //         return S.documentList()
      //           .title("SubPages")
      //           .filter('_type == "page" && $pageTypeId == pageType._ref')
      //           .params({ pageTypeId });
      //       })
      //   ),
    ]);
