import { ImageResult, imageQuery } from "PageBuilder/baseQueries";

const appQueryNoLocales = `
_id,
'title':coalesce(title,name),
 description,
'homeRoute':*[_id == 'siteConfig'][0].indexPage->{ 'slug':slug.current },
...(*[_id == 'siteConfig'][0]{ contactMail,contactPhone }),
'slug':coalesce('/'+pageType->slug.current,'') +'/'+ slug.current,
'image':image{${imageQuery}},
layout
`;

export type appQueryResult = {
  _id: string;
  title?: string | null;
  description?: string | null;
  // homeRoute?: { [k: string]: string };
  slug?: string | null;
  layout?: "glossary" | null;
  image?: ImageResult;
  contactMail?: string;
  contactPhone?: string;
};

export const appQuery = appQueryNoLocales;
