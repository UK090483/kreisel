import { getSlugField } from "PageBuilder/schemaHelper/getSlugField";
import { defaultBockContent } from "PageBuilder/schemaHelper/snippets";
import { defineType } from "sanity";

export default defineType({
  name: "person",
  title: "Person",
  type: "document",
  groups: [
    {
      name: "page",
      title: "Page",
    },
  ],

  fields: [
    {
      name: "name",
      title: "name",
      type: "string",
    },
    {
      name: "position",
      title: "SubTitle",
      type: "text",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "avatar",
      type: "defaultImage",
    },

    getSlugField({ group: "page", source: "name" }),
    { ...defaultBockContent, group: "page" },
    {
      name: "variant",
      title: "Variation",
      type: "string",
      options: {
        list: [
          { title: "Avatar (default)", value: "avatar" },
          { title: "Image", value: "image" },
        ],
        layout: "radio",
      },
    },
  ],
});
