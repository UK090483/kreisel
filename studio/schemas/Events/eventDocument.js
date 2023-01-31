// export default {
//   name: "event",
//   title: "Veranstaltung",
//   type: "document",
//   fields: [
//     {
//       name: "multi",
//       title: "Multi",
//       type: "boolean",
//       initialValue: false,
//     },
//     {
//       name: "title",
//       title: "Title",
//       type: "string",
//       hidden: ({ document }) => !document?.multi,
//     },
//     {
//       name: "description",
//       title: "Description",
//       type: "text",
//       hidden: ({ document }) => !document?.multi,
//     },

//     {
//       name: "eventItems",
//       title: "Sub Events",
//       type: "array",
//       of: [{ type: "eventItem" }],
//       validation: (Rule) => Rule.required().max(2),
//     },

//     {
//       name: "tags",
//       title: "Tags",
//       type: "array",
//       options: {
//         layout: "tags",
//       },
//       of: [{ type: "reference", to: { type: "eventTag" } }],
//     },
//   ],
//   orderings: [
//     {
//       title: "Release Date, New",
//       name: "releaseDateDesc",
//       by: [{ field: "eventItems[0].startDate", direction: "desc" }],
//     },
//   ],
//   preview: {
//     select: {
//       title: "title",
//       startDate: "eventItems[0].startDate",
//       endDate: "eventItems[0].endDate",
//       items: "eventItems",
//       multi: "multi",
//     },
//     prepare({ title, startDate, endDate, items, multi }) {
//       const _title = multi ? title : items && items[0].title;

//       const _startDate = startDate
//         ? new Date(startDate).toLocaleDateString()
//         : "not Set";
//       const _endDate = endDate
//         ? new Date(endDate).toLocaleDateString()
//         : "not Set";

//       return { title: _title, subtitle: `${_startDate}-${_endDate}` };
//     },
//   },
// };

export {};
