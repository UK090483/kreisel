import { RiFileListFill } from "react-icons/ri";
export default {
  title: "List",
  name: "navigationMegaMenuItem",
  type: "object",
  fields: [
    {
      name: "label",
      type: "string",
      title: "Label",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "items",
      type: "array",
      title: "Main Navigation",
      of: [{ type: "navigationItem" }],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      label: "label",
    },
    prepare(selection) {
      const { label } = selection;
      return {
        title: label,
        subtitle: "List",
        media: RiFileListFill,
      };
    },
  },
};
