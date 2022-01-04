import { Seo } from "studio/schema";

export interface SeoType extends Seo {
  canonical?: string;
}

export interface SeoResult {
  seo: SeoType;
}

const localeValue = (val: string, locale: string) => {
  return locale ? `${val}_${locale}, ${val}` : val;
};

export const seoQuery = (locale: string = "") => `
'seo':{
  'canonical': select( defined(pageType) => '/'+ pageType->slug.current +'/' + slug.current ,!defined(pageType) => '/' + slug.current),
  'shareGraphic':coalesce(featuredImage, *[_id == 'siteConfig'][0].seo.shareGraphic),
  'metaTitle':coalesce(${localeValue(
    "title",
    locale
  )},*[_id == 'siteConfig'][0].seo.metaTitle),
  'metaDesc':coalesce(${localeValue(
    "description",
    locale
  )},*[_id == 'siteConfig'][0].seo.metaDesc),
  
  'shareTitle': coalesce(${localeValue(
    "title",
    locale
  )},*[_id == 'siteConfig'][0].seo.metaTitle),

  'shareDesc':coalesce(${localeValue(
    "description",
    locale
  )},*[_id == 'siteConfig'][0].seo.shareDesc),
}
`;
