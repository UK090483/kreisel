import { AiOutlineLink } from "react-icons/ai";
import { defineType } from "sanity";

export default defineType({
  title: "Link",
  name: "navigationItem",
  type: "object",
  fields: [
    { name: "label", type: "string", title: "Label" },
    {
      name: "link",
      title: "Link",
      type: "link",
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

        media: AiOutlineLink,
      };
    },
  },
});
