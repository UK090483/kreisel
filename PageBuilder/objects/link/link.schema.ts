import { defineType } from "sanity";

export default defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    {
      name: "internal",
      title: "Internal Link",
      type: "reference",

      to: [{ type: "page" }, { type: "person" }],
      options: {
        disableNew: true,
      },
      hidden: ({ parent }: any) => !!parent?.href,
    },
    {
      name: "onPageLink",
      title: "On page Link",
      description: "must be the exact Title of a Section",
      type: "string",
      hidden: ({ parent }: any) => !parent?.internal,
    },
    {
      name: "href",
      title: "External Link",
      type: "url",
      hidden: ({ parent }: any) => !!parent?.internal,
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
        }),
    },
  ],
});
