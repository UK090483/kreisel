// import { mockClient } from "./testPrepare";
// import { fetchStaticProps } from "../fetchStaticProps";

// const locales = {
//   de: { title: "Deutsch", isDefault: true, flag: "🇩🇪" },
//   en: { title: "Englisch", flag: "🇺🇸" },
//   da: { title: "Dänisch", flag: "🇩🇰" },
// };

// const database = [
//   {
//     _type: "page",
//     _id: "testPage",
//     slug: { current: "testSlug" },
//     slug_en: { current: "testSlugEn" },
//     title: "testData",
//   },
//   {
//     _type: "page",
//     _id: "indexPage",
//     slug: { current: "testHome" },
//     title: "testData",
//   },
//   {
//     _id: "siteConfig",

//     indexPage: { _ref: "indexPage" },
//   },
// ];

// describe.only("fetchStaticProps", () => {
//   it("should throw without props ", async () => {
//     //@ts-ignore
//     await expect(fetchStaticProps()).rejects.toThrowError();
//     await expect(
//       fetchStaticProps({
//         query: "any",
//         sanityClient: mockClient({ fetchReturn: { test: "test" } })(),
//         locales,
//       })
//     ).rejects.toThrowError();
//   });

//   it("should get the page", async () => {
//     const res = await fetchStaticProps<{ _id: string }>({
//       query: "...",
//       params: { slug: ["testSlug"] },
//       sanityClient: mockClient({ database })(),
//       locales,
//     });
//     expect(res.props.page?._id).toEqual("testPage");
//   });

//   it("should get the IndexPage", async () => {
//     const res = await fetchStaticProps<{ _id: string }>({
//       query: "...",
//       params: { slug: [""] },
//       sanityClient: mockClient({ database })(),
//       locales,
//     });
//     expect(res.props.page?._id).toEqual("indexPage");
//   });

//   it("should get translated Pages", async () => {
//     const res = await fetchStaticProps<{ _id: string }>({
//       query: "...",
//       params: { slug: ["testSlugEn"] },
//       sanityClient: mockClient({ database })(),
//       locales,
//     });
//     expect(res.props.page?._id).toEqual("testPage");
//   });
// });
export {};
