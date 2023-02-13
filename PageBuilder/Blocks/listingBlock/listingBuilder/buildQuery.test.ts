import buildQuery from "./buildQuery";
import { listingBuilderItem } from "./types";
import { testQuery } from "../../../__test__/queryTest";

const getItem = (_type: string, name: string, value: number) => ({
  _id: name.toUpperCase() + value,
  _type,
  name: name + value,
  title: name.toUpperCase() + value,
  value,
  projectionTest: name + value,
});

const getItems = (type: string, name: string, count: number) =>
  new Array(count).fill(true).map((i, index) => getItem(type, name, index + 1));
const builderItems: listingBuilderItem[] = [
  {
    name: "A",
    title: "ATitle",
    variants: [
      { title: "variantA", value: "variantA" },
      { title: "variantB", value: "variantB" },
    ],
    filter: [
      {
        value: "testFilter1",
        title: "F1",
        queryFilter: { filter: "value < 3" },
      },
      {
        value: "testFilter2",
        title: "F2",
        queryFilter: { filter: "value > 1", order: "value desc" },
      },
      {
        value: "testFilter3",
        title: "F3",
        queryFilter: {
          filter: "value > 0",
          slice: { start: 1, end: 4 },
        },
      },
    ],
  },
  {
    name: "B",
    title: "ATitle",
    variants: [
      { title: "variantA", value: "variantA" },
      { title: "variantB", value: "variantB" },
    ],
  },
];

const getData = ({ list = {} }: { list: Record<string, any> }) => [
  { _id: "tester", list: { ...list } },
  ...getItems("A", "a", 5),
  ...getItems("B", "b", 5),
];

const runTestQuery = async (
  items: listingBuilderItem[],
  data: any[] = getData({ list: {} })
) => {
  return testQuery(
    `*[_id == "tester"][0]{
         'list':list{${buildQuery(
           items,
           `...select(_type == "reference" =>@->,@){...}`
         )}}
        }`,
    data
  ) as Promise<{
    list?: {
      contentType?: string;
      variant?: string;
      items: { _id: string; value: number; projectionTest: any }[];
    };
  }>;
};

describe("Build listing Query", () => {
  it("result to have property items", async () => {
    const res = await runTestQuery(builderItems);
    expect(res.list).toHaveProperty("items", null);
  });
  it("result to have property variant", async () => {
    const res = await runTestQuery(builderItems);
    expect(res.list).toHaveProperty("variant", null);
  });
  it("result to have property contentType", async () => {
    const res = await runTestQuery(builderItems);
    expect(res.list).toHaveProperty("contentType", null);
  });
  it("result to have given contentType value", async () => {
    const res = await runTestQuery(
      builderItems,
      getData({ list: { contentType: "a" } })
    );
    expect(res.list?.contentType).toBe("a");
  });
  it("result to have given variant value", async () => {
    const res = await runTestQuery(
      builderItems,
      getData({
        list: { contentType: "A", AVariants: "variantC", BVariant: "variantB" },
      })
    );
    expect(res.list?.variant).toBe("variantC");
  });
  it("result items to have the requested references", async () => {
    const res = await runTestQuery(
      builderItems,
      getData({
        list: {
          contentType: "A",
          AItems: [
            { _ref: "A2", _type: "reference" },
            { _ref: "A3", _type: "reference" },
          ],
        },
      })
    );
    expect(res.list?.items.map((i) => i._id)).toEqual(["A2", "A3"]);
  });
  it("result items to have use base Projection", async () => {
    const res = await runTestQuery(
      builderItems,
      getData({
        list: {
          contentType: "A",
          AItems: [
            { _ref: "A2", _type: "reference" },
            { _ref: "A3", _type: "reference" },
          ],
        },
      })
    );
    expect(res.list?.items.map((i) => i.projectionTest)).toEqual(["a2", "a3"]);
  });

  it("result items to have the requested filter Items", async () => {
    const res = await runTestQuery(
      builderItems,
      getData({
        list: { contentType: "A", AFilter: "testFilter1" },
      })
    );
    expect(res.list?.items.map((i) => i._id)).toEqual(["A1", "A2"]);
  });
  it("result items to have the requested filter Items Ordered", async () => {
    const res = await runTestQuery(
      builderItems,
      getData({
        list: { contentType: "A", AFilter: "testFilter2" },
      })
    );
    expect(res.list?.items.map((i) => i.value)).toEqual([5, 4, 3, 2]);
  });
  it("result items to have the requested filter Items Slice", async () => {
    const res = await runTestQuery(
      builderItems,
      getData({
        list: { contentType: "A", AFilter: "testFilter3" },
      })
    );
    expect(res.list?.items.map((i) => i.value)).toEqual([2, 3, 4]);
  });
});
