import { UpdateEventProducer } from "./EventManager";
import {
  memberCreated,
  memberErased,
  memberLocked,
  memberUnlocked,
  profileLocked,
  profileUnlocked,
} from "./Events";

type dataOverwrite = {
  before?: {} | null;
  after?: {} | null;
  delta?: {} | null;
};
const getData = (data?: dataOverwrite) => {
  return {
    before: data?.before === null ? null : { _type: "member", ...data?.before },
    after: data?.after === null ? null : { ...data?.after },
    delta: data?.delta === null ? null : { ...data?.delta },
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
      delta: null,
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
    run(memberUnlocked, {
      delta: null,
    }).toBe(false);
    run(memberUnlocked, {
      delta: null,
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
    run(profileLocked, {
      delta: null,
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
    run(profileUnlocked, {
      delta: null,
    }).toBe(false);
    run(profileUnlocked, {}).toBe(false);
  });
});

describe("MemberCreated", () => {
  it("should fire", () => {
    run(memberCreated, {
      delta: null,
      before: null,
    }).toBe(true);
  });
  it("should not fire", () => {
    run(memberCreated, {
      delta: null,
      before: {},
    }).toBe(false);
    run(memberCreated, {}).toBe(false);
  });
});

describe("MemberErased", () => {
  it("should fire", () => {
    run(memberErased, {
      delta: null,
      after: null,
    }).toBe(true);
  });
  it("should not fire", () => {
    run(memberErased, {
      delta: null,
      before: null,
    }).toBe(false);
    run(memberErased, {}).toBe(false);
  });
});
