import S from "@sanity/desk-tool/structure-builder";

import { MdSettings } from "react-icons/md";

import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2021-06-07" });

const isLocal = window.location.hostname === "localhost";

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
              ...(isLocal
                ? [
                    S.listItem()
                      .title("Page Types")
                      .child(S.documentTypeList("pageType")),
                  ]
                : []),
            ])
        ),

      S.listItem({
        id: "pages",
        title: "Pages",
        schemaType: "page",
        child: async () => {
          const pageTypes = await client.fetch(
            '*[_type == "pageType"]{_id ,name}'
          );

          const root = S.listItem()
            .id("page")
            .title("Root")
            .child(
              S.documentTypeList("page")
                .title(`Pages`)
                .filter(`_type == "page" && !defined(pageType) `)
            );

          const items = pageTypes.map(({ _id: pageTypeId, name }) =>
            S.listItem()
              .id(pageTypeId)
              .title(name)
              .child(
                S.documentTypeList("page")
                  .title(`${name}`)
                  .filter("_type == $type && pageType._ref == $pageTypeId")
                  .params({ pageTypeId, type: "page" })
                  .initialValueTemplates([
                    S.initialValueTemplateItem("page-by-pageType", {
                      pageTypeId,
                    }),
                  ])
              )
          );

          return S.list({ id: "li", items: [root, ...items] });
        },
      }),
      S.listItem().title("Termine").child(S.documentTypeList("event")),
      S.listItem().title("Therapeuten").child(S.documentTypeList("therapist")),
      S.listItem().title("Articles").child(S.documentTypeList("article")),
      S.listItem().title("Persons").child(S.documentTypeList("person")),
      S.listItem()
        .title("Testimonials")
        .child(S.documentTypeList("testimonial")),

      S.listItem().title("Auth").child(S.documentTypeList("verificationToken")),
    ]);
