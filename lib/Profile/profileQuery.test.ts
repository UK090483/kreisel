import { fetchProfileData } from "./profileQuery";
import { memberFields, profileFields } from "./Fields";
import { mockClient } from "../../services/SanityService/test/testClient";
import {} from "lodash";
const testMember = { _type: "member", email: { current: "testEmail" } };
const testImage = {
  _type: "sanity.imageAsset",
  _id: "testimageId",
  email: { current: "testEmail" },
  url: "testUrl",
};

const fieldsToValues = (fields: any[]) => {
  return fields
    .filter((i) => !["email"].includes(i.name))
    .reduce((acc, i) => {
      let value: any = `${i.name}_value`;

      if (i.type === "array") {
        value = [`${i.name}_value`];
      }
      if (i.type === "image") {
        value = { url: null };
      }
      if (i.type === "boolean") {
        value = true;
      }

      return { ...acc, [i.name]: value };
    }, {});
};

const testMemberValues = fieldsToValues(memberFields);
const testProfileValues = fieldsToValues(profileFields);

const tester = async (props?: { db: any }) => {
  const client = mockClient({
    database: props?.db,
  });
  return await fetchProfileData("testEmail", client);
};

describe("profile Query test", () => {
  it("should return if no data found", async () => {
    const result = await tester();
    expect(result).toBe(null);
  });
  it("should return right member status", async () => {
    const result1 = await tester({ db: [{ ...testMember }] });
    expect(result1?.allowMember).toBe(false);
    const result2 = await tester({
      db: [{ ...testMember, allowMember: true }],
    });
    expect(result2?.allowMember).toBe(true);
  });
  it("should return right allowProfile status", async () => {
    const result1 = await tester({ db: [{ ...testMember }] });
    expect(result1?.allowProfile).toBe(false);
    const result2 = await tester({
      db: [{ ...testMember, allowProfile: true }],
    });
    expect(result2?.allowProfile).toBe(true);
  });

  it("should fetch all member values (and strip other)", async () => {
    const result = await tester({
      db: [{ ...testMember, ...testMemberValues, ...testProfileValues }],
    });
    expect(result?.profile).toEqual(testMemberValues);
  });

  it("should fetch all profile values (and strip other)", async () => {
    const result = await tester({
      db: [
        {
          ...testMember,
          allowProfile: true,
          ...testMemberValues,
          ...testProfileValues,
        },
      ],
    });
    expect(result?.profile).toEqual({
      ...testMemberValues,
      ...testProfileValues,
    });
  });
});
