import handleIntrinsic from "./handleIntrinsic";

import { imageMeta, imageMeatWithCrop } from "./testprepare";

const width = 123;
const height = 345;

describe("handleIntrinsic", () => {
  it("type click should render ", () => {
    const res = handleIntrinsic(imageMeta, {});
    expect(res.width).toBe(imageMeta.width);
    expect(res.height).toBe(imageMeta.height);
  });
});
