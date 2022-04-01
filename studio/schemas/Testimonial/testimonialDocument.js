export default {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
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
      media: "image",
    },
  },
};
