import { defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    {
      name: "internalTitle",
      title: "interner Titel",
      type: "string",
    },
    {
      name: "text",
      title: "Text",
      type: "text",
    },

    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "position",
      title: "Position",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "defaultImage",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description:
        'muss nur ausgefüllt werden wenn es nicht "Das sagen ehemalige Teilnehmer*innen" heißen soll',
    },
  ],
  preview: {
    select: {
      title: "name",
      internalTitle: "internalTitle",
      media: "image",
    },
    prepare(prop) {
      return {
        title: prop?.internalTitle || prop?.title,
        media: prop.media,
      };
    },
  },
});
