import { defineType } from "sanity";

export default defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    {
      name: "internalLink",
      title: "Internal Link",
      type: "reference",

      to: [{ type: "page" }],
      options: {
        disableNew: true,
      },
      hidden: ({ parent }: any) => !!parent?.externalLink,
    },
    {
      name: "onPageLink",
      title: "On page Link",
      description: "must be the exact Title of a Section",
      type: "string",
      hidden: ({ parent }: any) => !parent?.internal,
    },
    {
      name: "externalLink",
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
