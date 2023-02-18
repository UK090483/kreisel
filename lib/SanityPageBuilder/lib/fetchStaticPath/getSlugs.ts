import { defaultLocales } from "./defaultValues";
import { LocationConfig } from "lib/SanityPageBuilder/types";
import type { SanityClient } from "@sanity/client";

export type getSlugsProps = {
  doc: string;
  client: SanityClient;
  locales: LocationConfig;
  query?: string;
};
type slugResult = {
  slug: string;
  [k: string]: any;
};

export type GetSlugsResult = {
  slugs: slugResult[];
  homeSlug?: slugResult;
};

const getAllSlugs: (props: getSlugsProps) => Promise<GetSlugsResult> = async (
  props
) => {
  const { doc, client, locales = defaultLocales } = props;

  const i18nQuery = Object.entries(locales).reduce((acc, [locale, item]) => {
    if (!item.isDefault) {
      return `${acc} 'slug-${locale}': slug_${locale}.current ,`;
    }
    return acc;
  }, "");

  const allPages = await client.fetch<GetSlugsResult>(
    `{'slugs': *[_type == "${doc}"]{ 
          'slug': select(defined(pageType)=> pageType->slug.current +'/'+ slug.current,slug.current ),
          ${i18nQuery}
        },
        'homeSlug':{
            'slug':*[_id == 'siteConfig'][0].indexPage->slug.current
            }
        }`
  );

  if (!allPages || !allPages.slugs || !Array.isArray(allPages.slugs)) {
    throw new Error("No Path returned");
  }
  return allPages;
};

export default getAllSlugs;
