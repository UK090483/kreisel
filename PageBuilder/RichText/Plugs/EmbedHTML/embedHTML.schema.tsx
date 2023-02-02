import { defineType } from "sanity";
import { ImEmbed } from "react-icons/im";

const embedHTMLSchema = defineType({
  name: "embedHTML",
  title: "Embed HTML",
  type: "object",
  fields: [
    {
      name: "html",
      title: "HTML",
      type: "text",
      description:
        "You usually want to avoid storing freeform HTML, but for embed codes it can be useful.",
      options: {
        language: "html",
      },
      icon: ImEmbed,
    },
  ],
  preview: {
    select: {
      title: "html",
    },
    prepare({ title }) {
      return {
        title,
        media: ImEmbed,
      };
    },
  },

  icon: ImEmbed,
});

export default embedHTMLSchema;
