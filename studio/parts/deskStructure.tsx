import { MdSettings } from "react-icons/md";
import { deskTool, StructureResolver } from "sanity/desk";
import Iframe, { IframeOptions } from "sanity-plugin-iframe-pane";
import { resolveProductionUrl } from "./resolveProductionUrl";

const isLocal = window.location.hostname === "localhost";

const iframeOptions: IframeOptions = {
  url: (doc) => resolveProductionUrl(doc),
  defaultSize: "mobile",
  reload: {
    revision: false,
    button: false,
  },
};

const structure: StructureResolver = (S, context) =>
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
          const pageTypes = await context
            .getClient({ apiVersion: "2021-06-07" })
            .fetch<{ _id: string; name: string }[]>(
              '*[_type == "pageType"]{_id ,name}'
            );

          const root = S.listItem()
            .id("page")
            .title("Root")
            .child(
              S.documentTypeList("page")
                .title(`Pages`)
                .filter(`_type == "page" && !defined(pageType) `)
                .child(
                  S.document()
                    .schemaType("page")
                    .views([
                      S.view.form(),
                      S.view
                        .component(Iframe)
                        .options(iframeOptions)
                        .title("Preview"),
                    ])
                )
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
                  .child(
                    S.document()
                      .schemaType("page")
                      .views([
                        S.view.form(),
                        S.view
                          .component(Iframe)
                          .options(iframeOptions)
                          .title("Preview"),
                      ])
                  )
              )
          );

          return S.list({
            title: "Page types",
            id: "li",
            items: [root, ...items],
          });
        },
      }),

      S.listItem().title("Mitglieder").child(S.documentTypeList("therapist")),
      S.listItem().title("Articles").child(S.documentTypeList("article")),
      S.listItem().title("Persons").child(S.documentTypeList("person")),
      S.listItem()
        .title("Testimonials")
        .child(S.documentTypeList("testimonial")),
      S.listItem().title("ToolTip").child(S.documentTypeList("tooltip")),
      S.listItem().title("ReuseAble ").child(S.documentTypeList("reuseAble")),
    ]);

export default structure;
