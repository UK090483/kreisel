import { resolveProductionUrlDocument } from "./resolveProductionUrl";
import { MdSettings } from "react-icons/md";
import { StructureResolver, DefaultDocumentNodeResolver } from "sanity/desk";
import Iframe, { IframeOptions } from "sanity-plugin-iframe-pane";
import { uuid } from "@sanity/uuid";
import { ComposeIcon } from "@sanity/icons";

const isLocal = window.location.hostname === "localhost";
//const isLocal = false;

const iframeOptions: IframeOptions = {
  url: (doc) => resolveProductionUrlDocument(doc),
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
                    S.listItem().title("Tags").child(S.documentTypeList("tag")),
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
              '*[_type == "pageType"] | order(_updatedAt desc) {_id ,name}'
            );

          const root = S.listItem()
            .id("root_pages")
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

          return S.list({
            title: "Page Type",
            id: "pageType",
            items: [root, ...items],
          });
        },
      }),

      //S.listItem().title("Mitglieder").child(S.documentTypeList("member")),
      // S.listItem().title("Articles").child(S.documentTypeList("article")),

      ...(isLocal
        ? [
            S.documentTypeListItem("member")
              .title("Members")
              .child(() => {
                console.log(S.documentTypeList("member").getChild());

                return S.documentTypeList("member").menuItems([
                  S.menuItem()
                    .title("Create")
                    .icon(ComposeIcon)
                    .intent({
                      type: "create",
                      params: { type: "member", id: `member.${uuid()}` },
                    }),
                ]);
              }),
          ]
        : []),

      ...(!isLocal
        ? [
            S.documentTypeListItem("member")
              .title("Members")
              .child(() => {
                return S.documentTypeList("member")
                  .filter(
                    `_type == "member" && !(email.current match "*developermail.com")`
                  )
                  .menuItems([
                    S.menuItem()
                      .title("Neues Mitglied Anlegen")
                      .icon(ComposeIcon)
                      .intent({
                        type: "create",
                        params: { type: "member", id: `member.${uuid()}` },
                      }),
                  ]);
              }),
          ]
        : []),

      // S.listItem({
      //   id: "member",
      //   title: "Member",
      //   schemaType: "member",
      //   child: async () => {
      //     const members = await context
      //       .getClient({ apiVersion: "2021-06-07" })
      //       .fetch<{ _id: string; name: string }[]>(
      //         '*[_type == "member" && !(_id in path("drafts.**"))] | order(_updatedAt desc) {_id ,name}'
      //       );
      //     const items = members.map(({ _id: memberId, name }) =>
      //       S.documentListItem().schemaType("member").id(memberId).title(name)
      //     );
      //     return S.list({
      //       title: "Member",
      //       id: "member",
      //       items: [...items],
      //     }).menuItems([
      //       S.menuItem()
      //         .title("Create")
      //         .icon(ComposeIcon)
      //         .intent({
      //           type: "create",
      //           params: {
      //             type: "member",
      //             id: `member.${uuid()}`,
      //           },
      //         }),
      //     ]);
      //   },
      // }),

      S.listItem().title("Persons").child(S.documentTypeList("person")),
      S.listItem()
        .title("Testimonials")
        .child(S.documentTypeList("testimonial")),
      S.listItem().title("ToolTip").child(S.documentTypeList("tooltip")),
      S.listItem().title("ReuseAble ").child(S.documentTypeList("reuseAble")),
    ]);

export default structure;

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  if (["page"].includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view.component(Iframe).options(iframeOptions).title("Preview"),
    ]);
  }

  return S.document().views([S.view.form()]);
};
