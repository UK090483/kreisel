import DataParser from "./DataParser";

const run = (data: any) => {
  return DataParser(data);
};

describe("UpdateEventManager", () => {
  it("should call fail with incorrect data", () => {
    expect(run({})).toBeNull();
    expect(run({ before: { bla: "bla" } })).toEqual({
      before: { bla: "bla" },
      delta: null,
      after: null,
    });
    expect(run({ after: { bla: "bla" } })).toEqual({
      after: { bla: "bla" },
      delta: null,
      before: null,
    });
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
