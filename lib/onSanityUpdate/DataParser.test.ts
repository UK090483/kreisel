import DataParser from "./DataParser";

const run = (data: any) => {
  return DataParser(data);
};

describe("UpdateEventManager", () => {
  it("should call fail with incorrect data", () => {
    expect(run({})).toBeNull();
    expect(run({ before: { bla: "bla" } })).toBeNull();
    expect(run({ before: { after: { bla: "bla" } } })).toBeNull();
  });
  it("should run event handler", () => {
    const before = {
      string: "blu",
      notThereAfter: "any",
      object: { bla: "blu" },
      array: ["one", "two"],
      number: 2,
    };
    const after = {
      string: "bla",
      notThereBefore: "any",
      object: { bla: "bla" },
      array: ["one", "two", "tree"],
      number: 1,
    };

    expect(
      run({
        after,
        before,
      })
    ).toStrictEqual({
      after,
      before,
      delta: {
        string: {
          after: "bla",
          before: "blu",
        },
        notThereBefore: {
          after: "any",
          before: undefined,
        },
        notThereAfter: {
          after: undefined,
          before: "any",
        },
        object: {
          after: {
            bla: "bla",
          },
          before: {
            bla: "blu",
          },
        },
        array: {
          after: ["one", "two", "tree"],
          before: ["one", "two"],
        },
        number: {
          after: 1,
          before: 2,
        },
      },
    });
  });
});
