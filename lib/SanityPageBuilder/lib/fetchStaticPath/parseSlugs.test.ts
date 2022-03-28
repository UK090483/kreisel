import parseSlugs from "./parseSlugs";

const getSlugResult = {
  slugs: ["slug1", "slug/split"].map((slug) => ({
    slug,
    "slug-en": `${slug}-en`,
  })),
};

const locales = {
  de: { title: "Deutsch", isDefault: true, flag: "🇩🇪" },
  en: { title: "Englisch", flag: "🇺🇸" },
  da: { title: "Dänisch", flag: "🇩🇰" },
};

describe("parseSlugs", () => {
  it("should trow error if fetch result is not usable ", () => {
    let didThrow = false;
    try {
      //@ts-ignore
      parseSlugs({ getSlugResult: null });
    } catch (error) {
      didThrow = true;
    }
    expect(didThrow).toBe(true);
  });

  it("should return expected result no locales", () => {
    expect(parseSlugs({ getSlugResult })).toMatchSnapshot();
  });
  it("should return expected result with locales", () => {
    expect(parseSlugs({ getSlugResult, locales })).toMatchSnapshot();
  });
});
