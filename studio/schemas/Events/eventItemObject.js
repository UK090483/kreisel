export default {
  title: "Event",
  name: "eventItem",
  type: "object",

  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Description",
      name: "description",
      type: "text",
    },
    {
      title: "Start",
      name: "startDate",
      type: "datetime",
    },
    {
      title: "Start",
      name: "endDate",
      type: "datetime",
    },
  ],
  preview: {
    select: {
      title: "title",
      startDate: "startDate",
      endDate: "endDate",
    },
    prepare({ title, startDate, endDate }) {
      const _startDate = startDate
        ? new Date(startDate).toLocaleDateString()
        : "not Set";
      const _endDate = endDate
        ? new Date(endDate).toLocaleDateString()
        : "not Set";
      return { title: title, subtitle: `${_startDate}-${_endDate}` };
    },
  },
};
