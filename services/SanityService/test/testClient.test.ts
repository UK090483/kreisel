import { mockClient } from "./testClient";

const database = [
  { _type: "testType1", _id: "testId1" },
  { _type: "testType1", _id: "testId1b" },
  { _type: "testType2", _id: "testId2" },
];

describe("testClient", () => {
  test("should return null with no data", async () => {
    const res = await mockClient({}).fetch('*[ _type == "testType1"]');
    expect(res).toStrictEqual([]);
  });
  test("should return right data", async () => {
    const res = await mockClient({ database }).fetch(
      '*[ _type == "testType1"]'
    );
    expect(res).toStrictEqual(database.filter((i) => i._type === "testType1"));
  });

  test("should create with id", async () => {
    const client = mockClient({ database });
    const createItem = { _type: "createType" };
    await client.create(createItem);
    const res = await client.fetch('*[_type == "createType"][0]');
    expect(res).toStrictEqual({ _type: "createType", _id: "createType_1" });
  });

  test("should create without id", async () => {
    const client = mockClient({ database });
    const createItem = { _id: "bla", _type: "createType" };
    await client.create(createItem);
    const res = await client.fetch('*[_type == "createType"][0]');
    expect(res).toStrictEqual(createItem);
  });
});
