// const linkQuery = `
//    ...,
//   'internalLink': select(
//                  defined(internalLink) && defined(internalLink->pageType)  => '/'+ internalLink->pageType->slug.current + '/' + internalLink->slug.current,
//                  defined(internalLink) => '/'+ internalLink->slug.current
//                  ),
//  'href': select(
//             defined(externalLink) && !!defined(internalLink) => externalLink,
//             defined(internalLink) && defined(internalLink->pageType)  => '/'+ internalLink->pageType->slug.current + '/' + internalLink->slug.current,
//             defined(internalLink) => '/'+ internalLink->slug.current
//           ),
//   'external': select(defined(externalLink)=>true,defined(internalLink)=>false)
// `;

// interface LinkResult {
//   internalLink?: string | null;
//   href?: string | null;
//   external?: boolean;
// }

// type SeoResult = {
//   metaTitle: string;
//   metaDesc: string;
//   shareTitle: string;
//   shareGraphic: any;
//   shareDesc: string;
//   siteTitle: string;
//   url: string;
//   shareGraphicSrc: string;
// };

export {};
