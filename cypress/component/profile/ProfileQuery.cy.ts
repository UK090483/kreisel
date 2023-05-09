/* eslint-disable no-unused-expressions */
import { memberFields, profileFields } from "../../../lib/Profile/Fields";
import { fetchProfileData } from "../../../lib/Profile/profileQuery";

const testMail = "testEmail";
const testMember = { _type: "member", email: { current: testMail } };
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
const completeTestValues = { ...testMemberValues, ...testProfileValues };

const run = async (props?: { dataSet?: any[]; mail?: string }) => {
  const client = await cy.getSanityTestClient({
    dataSet: props?.dataSet || [testMember],
  });
  return await fetchProfileData(props?.mail || testMail, client);
};

describe("Profile Query", () => {
  it("should return if no data found", async () => {
    const res = await run({ dataSet: [] });
    expect(res).to.be.null;
  });
  it("should return if no data found", async () => {
    const res = await run({ dataSet: [] });
    expect(res).to.be.null;
  });

  it("should return correct member status (negative)", async () => {
    const res = await run();
    expect(res.allowMember).to.be.false;
  });
  it("should return correct profile status (negative)", async () => {
    const res = await run();
    expect(res.allowProfile).to.be.false;
  });
  it("should return correct member status (positive)", async () => {
    const res = await run({ dataSet: [{ ...testMember, allowMember: true }] });
    expect(res.allowMember).to.be.true;
  });
  it("should return correct profile status (positive)", async () => {
    const res = await run({ dataSet: [{ ...testMember, allowProfile: true }] });
    expect(res.allowProfile).to.be.true;
  });
  it("should fetch just member values if profile status (negative)", async () => {
    const res = await run({
      dataSet: [{ ...testMember, ...completeTestValues }],
    });
    expect(res.profile).to.deep.eq(testMemberValues);
  });

  Object.entries(completeTestValues).forEach((element) => {
    it(`should fetch value ${element[0]}`, async () => {
      const res = await run({
        dataSet: [{ ...testMember, ...completeTestValues, allowProfile: true }],
      });
      expect(res.profile[element[0]]).to.deep.eq(element[1]);
    });
  });
});
