import { Template } from "sanity";

export const pageByPageType: Template<
  { pageTypeId: string },
  { pageType: { _type: "reference"; _ref?: string } }
> = {
  id: "page-by-pageType",
  title: "Page by page type",
  description: "Page by a specific page type",
  schemaType: "page",
  parameters: [{ name: "pageTypeId", type: "string" }],

  value: (params) => {
    return { pageType: { _type: "reference", _ref: params?.pageTypeId } };
  },
};
