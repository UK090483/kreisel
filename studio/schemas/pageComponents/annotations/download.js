export default {
  title: "Link",
  name: "download",
  type: "file",

  preview: {
    select: {
      name: "name",
    },
    prepare(value) {
      return { title: value.name || "No Name" };
    },
  },
};
