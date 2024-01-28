// import { handleSanityUpdate } from "./handleSanityUpdate";
// import templates from "@lib/Email/template";

// const before = {};
// const root = { _type: "member", email: { current: "testmail" } };

// describe("handleSanityUpdate", () => {
//   it("should not work with wrong data", () => {
//     expect(handleSanityUpdate("").ok).toBe(false);
//     expect(handleSanityUpdate({}).ok).toBe(false);
//     expect(handleSanityUpdate({ before: "", after: "" }).ok).toBe(false);
//   });

//   it("should handle member ->  allowMember true", () => {
//     expect(
//       handleSanityUpdate({
//         before: { ...root, allowMember: false },
//         after: { ...root, allowMember: true },
//       })
//     ).toStrictEqual({
//       emails: [{ template: templates["memberUnlocked"], to: "testmail" }],
//       ok: true,
//     });
//   });
//   it("should handle member ->  allowMember false", () => {
//     expect(
//       handleSanityUpdate({
//         before: { ...root, allowMember: true },
//         after: { ...root, allowMember: false },
//       })
//     ).toStrictEqual({
//       emails: [{ template: templates["memberLocked"], to: "testmail" }],
//       ok: true,
//     });
//   // });
//   // it("should handle member ->  allowMember false", () => {
//   //   expect(
//   //     handleSanityUpdate({
//   //       before: { allowMember: true, _type: "member" },
//   //       after: { allowMember: false, _type: "member" },
//   //     }).messages
//   //   ).toStrictEqual([
//   //     {
//   //       text: "Ihr Zugang zum Mitgliederbereich wurde gesperrt",
//   //     },
//   //   ]);
//   // });
// });
