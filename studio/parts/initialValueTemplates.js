import T from "@sanity/base/initial-value-template-builder";

export default [
  ...T.defaults(),
  T.template({
    id: "page-by-pageType",
    title: "Page by page type",
    description: "Page by a specific page type",
    schemaType: "page",
    parameters: [{ name: "pageTypeId", type: "string" }],
    value: (params) => {
      return { pageType: { _type: "reference", _ref: params.pageTypeId } };
    },
  }),
];
