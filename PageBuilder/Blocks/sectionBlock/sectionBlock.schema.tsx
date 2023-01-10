import { blockStyle } from "PageBuilder/schemaHelper/blockStyle";
import { getFieldGroups } from "PageBuilder/schemaHelper/getFieldGroup";
import sectionTitle from "PageBuilder/schemaHelper/sectionTitle";

const SectionSchema = {
  name: "section",
  title: "Section",
  type: "object",
  ...getFieldGroups(),
  fieldsets: [
    {
      name: "image",
      title: "Image",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    sectionTitle({ group: "content" }),
    {
      name: "content",
      type: "defaultRichText",
      title: "Content",
      group: "content",
    },
    {
      title: "Image",
      name: "image",
      type: "defaultImage",
      fieldset: "image",
      group: "content",
    },
    {
      title: "Type",
      name: "type",
      type: "string",
      options: {
        list: [{ title: "Accordion", value: "accordion" }],
      },
      initialValue: "m",
    },
    ...blockStyle(),
  ],

  preview: {
    select: {
      title: "title",
      content: "content",
      image: "image",
    },
    prepare(selection: any) {
      const { title, content, image } = selection;
      const block = (content || []).find(
        (block: any) => block._type === "block"
      );

      return {
        title: `Section : ${title || "unnamed"}`,
        // subtitle: `${content ? content.length : "0"} Items`,
        subtitle: block
          ? block.children
              .filter((child: any) => child._type === "span")
              .map((span: any) => span.text)
              .join("")
          : "No title",
        media: image,
      };
    },
  },
};

export default SectionSchema;
