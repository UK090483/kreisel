import { AiOutlineLink } from "react-icons/ai";

export default {
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
};
