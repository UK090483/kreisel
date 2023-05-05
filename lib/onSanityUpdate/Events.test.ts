import { UpdateEventProducer } from "./EventManager";
import {
  memberLocked,
  memberUnlocked,
  profileLocked,
  profileUnlocked,
} from "./Events";

type dataOverwrite = { before?: {}; after?: {}; delta?: {} };
const getData = (data?: dataOverwrite) => {
  return {
    before: { _type: "member", ...data?.before },
    after: { ...data?.after },
    delta: { ...data?.delta },
  };
};

const run = (producer: UpdateEventProducer, data: dataOverwrite) => {
  return expect(
    Array.isArray(producer.evaluate)
      ? !producer.evaluate.map((i) => i(getData(data))).includes(false)
      : //@ts-ignore
        producer.evaluate(getData(data))
  );
};

describe("memberLocked", () => {
  it("should fire", () => {
    run(memberLocked, {
      delta: { allowMember: { before: true, after: false } },
    }).toBe(true);
  });
  it("should not fire", () => {
    run(memberLocked, {
      delta: { allowMember: { before: false, after: true } },
    }).toBe(false);
    run(memberLocked, {
      delta: { allowMember: { after: false } },
    }).toBe(false);
    run(memberLocked, {}).toBe(false);
  });
});

describe("memberUnlocked", () => {
  it("should fire", () => {
    run(memberUnlocked, {
      delta: { allowMember: { before: false, after: true } },
    }).toBe(true);
    run(memberUnlocked, {
      delta: { allowMember: { after: true } },
    }).toBe(true);
  });

  it("should not fire", () => {
    run(memberUnlocked, {
      delta: { allowMember: { before: true, after: false } },
    }).toBe(false);
    run(memberUnlocked, {}).toBe(false);
  });
});

describe("ProfileLocked", () => {
  it("should fire", () => {
    run(profileLocked, {
      delta: { allowProfile: { before: true, after: false } },
    }).toBe(true);
  });
  it("should not fire", () => {
    run(profileLocked, {
      delta: { allowProfile: { before: false, after: true } },
    }).toBe(false);
    run(profileLocked, {}).toBe(false);
  });
});

describe("ProfileUnlocked", () => {
  it("should fire", () => {
    run(profileUnlocked, {
      delta: { allowProfile: { before: false, after: true } },
    }).toBe(true);
    run(profileUnlocked, {
      delta: { allowProfile: { after: true } },
    }).toBe(true);
  });
  it("should not fire", () => {
    run(profileUnlocked, {
      delta: { allowProfile: { before: true, after: false } },
    }).toBe(false);
    run(profileUnlocked, {}).toBe(false);
  });
});
