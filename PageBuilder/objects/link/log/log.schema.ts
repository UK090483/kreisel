import { defineType } from "sanity";

export default defineType({
  name: "log",
  title: "Log",
  type: "document",
  fields: [
    {
      name: "day",
      title: "Day",
      type: "date",
      // readOnly: true,
    },
    {
      name: "logs",
      title: "Logs",
      type: "array",
      of: [{ type: "logItem" }],
    },
  ],
});

export const logItem = defineType({
  name: "logItem",
  title: "Log Item",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      // readOnly: true,
    },
  ],
});
