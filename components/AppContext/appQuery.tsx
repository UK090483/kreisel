const appQuery = (locale?: string) => `
'title':coalesce(title_${locale}, title),
'homeRoute':*[_id == 'siteConfig'][0].indexPage->{ 'slug':slug.current,'slug_en':slug_en.current,'slug_da':slug_da.current },
'slug':coalesce('/'+pageType->slug_${locale}.current, '/'+pageType->slug.current,'') +'/'+ coalesce(slug_${locale},slug).current
`;

export type appQueryResult = {
  title?: string | null;
  homeRoute?: { [k: string]: string };
  slug?: string | null;
};

export default appQuery;
