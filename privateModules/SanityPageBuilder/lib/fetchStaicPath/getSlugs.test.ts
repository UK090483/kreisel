import getSlugs from "./getSlugs";
import { mockClient } from "../tests/testPrepare";

const locales = {
  de: { title: "Deutsch", isDefault: true, flag: "🇩🇪" },
  en: { title: "Englisch", flag: "🇺🇸" },
  da: { title: "Dänisch", flag: "🇩🇰" },
};

const database = [
  ...["testPageHome", "testPage1", "widthSubRoute2", "CAPITAL-TestPage3"].map(
    (i) => ({
      _id: i,
      _type: "page",
      pageType: i === "widthSubRoute2" ? { _ref: "testPageType" } : null,
      slug: { current: i },
      slug_en: { current: i + "en" },
      slug_da: { current: i + "da" },
    })
  ),

  {
    _id: "noSlug",
    _type: "page",
    slug_en: { current: "noSlugEn" },
    slug_da: { current: "noSlugEn" },
  },
  {
    _id: "noTransSlug",
    _type: "page",
    slug: { current: "noTransSlug" },
  },

  { _id: "testPageType", _type: "pageType", slug: { current: "testPageType" } },
  { _id: "siteConfig", indexPage: { _ref: "testPageHome" } },
];

const mockFetchGetSlugs = ({
  fetchReturn,
  database,
  locales,
}: {
  fetchReturn?: any;
  database?: any;
  locales?: any;
}) => {
  return getSlugs({
    doc: "page",
    client: mockClient({
      ...(fetchReturn && { fetchReturn }),
      ...(database && { database }),
    }),
    locales: locales,
  });
};

describe("fetchStaticPath", () => {
  it("should trow error if fetch result is not [] ", async () => {
    await expect(mockFetchGetSlugs({ fetchReturn: null })).rejects.toThrow();
    await expect(mockFetchGetSlugs({ fetchReturn: "st" })).rejects.toThrow();
  });

  it("should return right data no locales ", async () => {
    // await expect(
    //   mockFetchGetSlugs({ fetchReturn: { slugs: [] } })
    // ).resolves.toStrictEqual({ paths: [] });
    // await expect(mockFetchStaticPaths({ database })).resolves.toMatchSnapshot();
  });

  //   it("should return right data ", async () => {
  //     await expect(
  //       mockFetchStaticPaths({ fetchReturn: [], locales })
  //     ).resolves.toStrictEqual({ fallback: "blocking", paths: [] });

  //     await expect(
  //       mockFetchStaticPaths({ database, locales })
  //     ).resolves.toMatchSnapshot();
  //   });
});
