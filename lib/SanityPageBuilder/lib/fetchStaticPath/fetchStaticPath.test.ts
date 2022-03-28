import fetchStaticPaths from "./fetchStaticPath";
import { mockClient } from "../MockClient";

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

const mockFetchStaticPaths = ({
  fetchReturn,
  database,
  locales,
  fallback,
}: {
  fetchReturn?: any;
  database?: any;
  locales?: any;
  fallback?: boolean | "blocking";
}) => {
  return fetchStaticPaths({
    doc: "page",
    client: mockClient({
      ...(fetchReturn && { mockReturnValue: fetchReturn }),
      ...(database && { database }),
    }),
    locales: locales,
    fallback,
  });
};

describe("fetchStaticPath", () => {
  it("should trow error if fetch result is not [] ", async () => {
    await expect(mockFetchStaticPaths({ fetchReturn: null })).rejects.toThrow();
    await expect(mockFetchStaticPaths({ fetchReturn: "st" })).rejects.toThrow();
    await expect(
      mockFetchStaticPaths({ fetchReturn: { slugs: [] } })
    ).resolves.toStrictEqual({ fallback: "blocking", paths: [] });
  });

  it("should handle fallback ", async () => {
    await expect(
      mockFetchStaticPaths({ fetchReturn: { slugs: [] } })
    ).resolves.toStrictEqual({ fallback: "blocking", paths: [] });
    await expect(
      mockFetchStaticPaths({ fetchReturn: { slugs: [] }, fallback: false })
    ).resolves.toStrictEqual({ fallback: false, paths: [] });
    await expect(
      mockFetchStaticPaths({ fetchReturn: { slugs: [] }, fallback: true })
    ).resolves.toStrictEqual({ fallback: true, paths: [] });
  });

  it("should return right data no locales ", async () => {
    await expect(
      mockFetchStaticPaths({ fetchReturn: { slugs: [] } })
    ).resolves.toStrictEqual({ fallback: "blocking", paths: [] });
    await expect(mockFetchStaticPaths({ database })).resolves.toMatchSnapshot();
  });

  it("should return right data ", async () => {
    await expect(
      mockFetchStaticPaths({ fetchReturn: { slugs: [] }, locales })
    ).resolves.toStrictEqual({ fallback: "blocking", paths: [] });

    await expect(
      mockFetchStaticPaths({ database, locales })
    ).resolves.toMatchSnapshot();
  });
});
