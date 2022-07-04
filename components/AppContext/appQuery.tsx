const appQuery = (locale?: string) => `
_id,
'title':coalesce(title_${locale}, title),
'homeRoute':*[_id == 'siteConfig'][0].indexPage->{ 'slug':slug.current,'slug_en':slug_en.current,'slug_da':slug_da.current },
'slug':coalesce('/'+pageType->slug_${locale}.current, '/'+pageType->slug.current,'') +'/'+ coalesce(slug_${locale},slug).current,

`;

const appQueryNoLocales = (locale?: string) => `
_id,
title,
'homeRoute':*[_id == 'siteConfig'][0].indexPage->{ 'slug':slug.current },
'slug':coalesce('/'+pageType->slug.current,'') +'/'+ slug.current
`;

export type appQueryResult = {
  _id: string;
  title?: string | null;
  homeRoute?: { [k: string]: string };
  slug?: string | null;
};

export default appQueryNoLocales;
