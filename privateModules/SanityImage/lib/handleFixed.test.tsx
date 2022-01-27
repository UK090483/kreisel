import handleFixed from "./handleFixed";

import { imageMeta, imageMeatWithCrop } from "./testprepare";

const width = 123;
const height = 345;

describe("handleFixed", () => {
  it("type click should render ", () => {
    const res = handleFixed(imageMeta, {});
    expect(res.width).toBe(imageMeta.width);
    expect(res.height).toBe(imageMeta.height);
  });

  it("should handle width", () => {
    const res = handleFixed(imageMeta, { width });
    expect(res.width).toBe(width);
    expect(res.height).toBe(width / imageMeta.aspectRatio);

    const resCrop = handleFixed(imageMeatWithCrop, { width });
    expect(resCrop.width).toBe(width);
    expect(resCrop.height).toMatchSnapshot();
  });

  it("should handle height", () => {
    const res = handleFixed(imageMeta, { height });
    expect(res.height).toBe(height);
    expect(res.width).toBe(height * imageMeta.aspectRatio);

    const resCrop = handleFixed(imageMeatWithCrop, { height });
    expect(resCrop.height).toBe(height);
    expect(resCrop.width).toMatchSnapshot();
  });

  it("should handle with and height", () => {
    const res = handleFixed(imageMeta, { height, width });
    expect(res.height).toBe(height);
    expect(res.width).toBe(width);
  });
});
