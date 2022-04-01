import { defaultBockContent } from "../snippets";

export default {
  type: "document",
  name: "reuseAbleBlock",
  title: "Page",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    },
    defaultBockContent,
  ],

  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
      };
    },
  },
};
