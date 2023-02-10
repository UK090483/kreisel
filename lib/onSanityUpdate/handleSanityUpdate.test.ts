import { handleSanityUpdate } from "./handleSanityUpdate";

const before = {};
const root = { _type: "member", email: { current: "testmail" } };

describe("handleSanityUpdate", () => {
  it("should not work with wrong data", () => {
    expect(handleSanityUpdate("").ok).toBe(false);
    expect(handleSanityUpdate({}).ok).toBe(false);
    expect(handleSanityUpdate({ before: "", after: "" }).ok).toBe(false);
  });

  it("should handle member ->  allowMember true", () => {
    expect(
      handleSanityUpdate({
        before: { ...root, allowMember: false },
        after: { ...root, allowMember: true },
      })
    ).toStrictEqual({
      emails: [{ template: "memberUnlocked", to: "testmail" }],
      ok: true,
    });
  });
  it("should handle member ->  allowMember false", () => {
    expect(
      handleSanityUpdate({
        before: { ...root, allowMember: true },
        after: { ...root, allowMember: false },
      })
    ).toStrictEqual({
      emails: [{ template: "memberLocked", to: "testmail" }],
      ok: true,
    });
  });
  // it("should handle member ->  allowMember false", () => {
  //   expect(
  //     handleSanityUpdate({
  //       before: { allowMember: true, _type: "member" },
  //       after: { allowMember: false, _type: "member" },
  //     }).messages
  //   ).toStrictEqual([
  //     {
  //       text: "Ihr Zugang zum Mitgliederbereich wurde gesperrt",
  //     },
  //   ]);
  // });
});
