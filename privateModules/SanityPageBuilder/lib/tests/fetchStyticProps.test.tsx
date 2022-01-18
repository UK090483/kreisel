import { mockClient } from "./testPrepare";
import { fetchStaticProps } from "../fetchStaticProps";

const locales = {
  de: { title: "Deutsch", isDefault: true, flag: "🇩🇪" },
  en: { title: "Englisch", flag: "🇺🇸" },
  da: { title: "Dänisch", flag: "🇩🇰" },
};

const database = [
  {
    _type: "page",
    _id: "testPage",
    slug: { current: "testSlug" },
    slug_en: { current: "testSlugEn" },
    title: "testData",
  },
  {
    _type: "page",
    _id: "indexPage",
    slug: { current: "testHome" },
    title: "testData",
  },
  {
    _id: "siteConfig",

    indexPage: { _ref: "indexPage" },
  },
];

describe.only("fetchStaticProps", () => {
  it("should throw without props ", async () => {
    //@ts-ignore
    await expect(fetchStaticProps()).rejects.toThrowError();
    await expect(
      fetchStaticProps({
        query: "any",
        client: mockClient({ fetchReturn: { test: "test" } }),
        locales,
      })
    ).rejects.toThrowError();
  });

  it("should get the page", async () => {
    const res = await fetchStaticProps({
      query: "...",
      params: { slug: ["testSlug"] },
      client: mockClient({ database }),
      locales,
    });

    //@ts-ignore
    expect(res.props.data._id).toEqual("testPage");
  });

  it("should get the IndexPage", async () => {
    const res = await fetchStaticProps<{ _id: string }>({
      query: "...",
      params: { slug: [""] },
      client: mockClient({ database }),
      locales,
    });

    //@ts-ignore
    expect(res.props.data?._id).toEqual("indexPage");
  });

  it("should get translated Pages", async () => {
    const res = await fetchStaticProps<{ _id: string }>({
      query: "...",
      params: { slug: ["testSlugEn"] },
      client: mockClient({ database }),
      locales,
    });
    //@ts-ignore
    expect(res.props.data?._id).toEqual("testPage");
  });
});
