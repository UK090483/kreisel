import { AiOutlineLink } from "react-icons/ai";
import { defineField } from "sanity";

export default defineField({
  name: "link",
  type: "object",
  title: "Link",
  fields: [
    { title: "Link", name: "link", type: "link" },
    {
      title: "As Button",
      name: "asButton",
      type: "boolean",
    },
  ],
  icon: AiOutlineLink,
});
