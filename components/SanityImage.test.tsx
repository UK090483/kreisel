import { render, screen, cleanup } from "@testing-library/react";
import SanityImage from "./SanityImage";

const testImage = {
  aspectRatio: 1.5,
  height: 200,
  width: 300,
  lqip: "testPlaceholder",
  url: "testUrl",
  alt: "testAlt",
};

const crop = {
  bottom: 0.2,
  left: 0.2,
  right: 0.2,
  top: 0.2,
};

const hotspot = {
  x: 0.2,
  y: 0.2,
};
const image = (o?: { src?: {}; props?: {} }) => {
  cleanup();
  render(<SanityImage src={{ ...testImage, ...o?.src }} {...o?.props} />);
  return screen.getByRole<HTMLImageElement>("img");
};
describe("<SanityImage />", () => {
  afterEach(() => {
    cleanup();
  });

  it("should add url", () => {
    expect(image().src).toMatch(/testUrl/);
  });

  it("should add alt ", () => {
    expect(image()).toHaveAttribute("alt", "testAlt");
  });

  it("should add width,and hight ", () => {
    expect(image()).toHaveAttribute("width", "300");
    expect(image()).toHaveAttribute("height", "200");
  });
  it("should add format auto", () => {
    expect(image().src).toMatch(/auto=format/);
  });
  it("should add default quality", () => {
    expect(image().src).toMatch(/q=75/);
  });
  it("should add custom quality", () => {
    expect(image({ props: { quality: 50 } }).src).toMatch(/q=50/);
  });

  it("should not add width or height if fill ", () => {
    expect(image({ props: { fill: true } }).width).toBeFalsy();
    expect(image({ props: { fill: true } }).height).toBeFalsy();
  });

  it("should handle custom width by respecting aspect", () => {
    expect(image({ props: { width: 200 } }).width).toBe(200);
    expect(image({ props: { width: 200 } }).height).toBe(300);
  });
  it("should handle custom height by respecting aspect ", () => {
    expect(image({ props: { height: 200 } }).width).toBe(133);
    expect(image({ props: { heigth: 200 } }).height).toBe(200);
  });

  it("should handle crop", () => {
    expect(
      image({
        src: { crop },
      }).src
    ).toMatch(/rect=60,40,180,120&fit=clip/);
  });

  it("should handle crop while fill", () => {
    expect(
      image({
        props: { fill: true },
        src: { crop },
      }).src
    ).toMatch(/rect=60,40,180,120&fit=clip/);
  });

  it("should handle hotspot", () => {
    expect(
      image({
        props: { fill: true },
        src: {
          hotspot,
        },
      }).style.objectPosition
    ).toBe("20% 20%");
  });

  it("should handle hotspot and crop", () => {
    expect(
      image({
        props: { fill: true },
        src: {
          hotspot: { x: 0.3, y: 0.3 },
          crop,
        },
      }).style.objectPosition
    ).toBe("17% 17%");
  });
});
