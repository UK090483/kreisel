// import { groq } from "next-sanity";

// export const siteQuery = groq`
// {'navigation':*[_type=='navigation'][0]{
//    'main': item[]{
//      'key':_key,
//      label,
//      label_en,
//      'slug':internalLink->slug.current,
//      'items':item[]{
//        'key':_key,
//        label,
//        label_en,
//        'slug':internalLink->slug.current,
//        }
//      }
//    },
//    'config':*[_type=='configSettings'][0]{
//    ...,
//     },
//   'seo':*[_type=='seoSettings'][0]{
//    ...,
//     },
// }
// `;

// export type NavigationItem = {
//   key: string;
//   label: string;
//   labelEn: string;
//   slug: string;
//   items: Omit<NavigationItem, "items">[] | null;
// };

// export type SiteResult = {
//   config?: {
//     kontaktAdress?: string;
//     kontaktMail?: string;
//     kontaktTel?: string;
//     url?: string;
//     cvr?: string;
//   };
//   navigation: {
//     main: NavigationItem[];
//   };
//   seo: {};
// };

export {};
