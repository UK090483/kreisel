// import type { SanityClient } from "@sanity/client/sanityClient";

// const getAllDocSlugs: (
//   doc: string,
//   client: SanityClient
// ) => Promise<
//   null | { slug: string; pageType: null | string; isHome: boolean }[]
// > = async (doc, client) => {
//   return client.fetch(
//     `*[_type == "${doc}"]{
//         'pageType': pageType->slug.current ,
//         'slug': slug.current ,
//         'isHome':*[_id == 'siteConfig'][0].indexPage._ref == @._id }
//     `
//   );
// };

// export type FetchStaticPathsParams = {
//   slug?: string[];
// };
// export type FetchStaticPathsResult = {
//   paths: { params: FetchStaticPathsParams }[];
//   fallback: boolean;
// };

// export const fetchStaticPaths = async (
//   doc: string,
//   client: SanityClient
// ): Promise<FetchStaticPathsResult> => {
//   const allPages = await getAllDocSlugs(doc, client);

//   if (!allPages || !Array.isArray(allPages)) {
//     throw new Error("No Path returned");
//   }

//   return {
//     paths:
//       allPages.reduce((acc, page, index) => {
//         if (!page.slug) return [...acc];
//         const pageType = page.pageType && page.pageType.toLowerCase();
//         const slug = page.slug.toLowerCase();

//         let pageParams = {
//           params: { slug: pageType ? [pageType, slug] : [slug] },
//         };

//         if (page.isHome) {
//           pageParams = {
//             params: { slug: [""] },
//           };
//         }

//         return [...acc, pageParams];
//       }, [] as any[]) || [],
//     fallback: false,
//   };
// };

export {};
