import { RiFileListFill } from "react-icons/ri";
import { defineType } from "sanity";

export default defineType({
  title: "Navigation Dropdown",
  name: "navigationDropdown",
  type: "object",
  fields: [
    { name: "label", type: "string", title: "Label" },

    {
      name: "items",
      type: "array",
      title: "Main Navigation",
      of: [{ type: "navigationItem" }],
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
        subtitle: "Link",
        media: RiFileListFill,
      };
    },
  },
});
