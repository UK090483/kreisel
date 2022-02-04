import { LocationConfig } from "@privateModules/SanityPageBuilder/types";
import type { SanityClient } from "@sanity/client/sanityClient";

type getSlugsProps = {
  doc: string;
  client: SanityClient;
  locales: LocationConfig;
  query?: string;
};
type getSlugsResult = {
  slug: string;
  [k: string]: any;
  pageType: null | string;
  isHome: boolean;
}[];

const getAllSlugs: (props: getSlugsProps) => Promise<getSlugsResult> = async (
  props
) => {
  const { doc, client, locales } = props;

  const i18nQuery = Object.entries(locales).reduce((acc, [locale, item]) => {
    if (!item.isDefault) {
      return `${acc} 'slug-${locale}': slug_${locale}.current ,`;
    }
    return acc;
  }, "");

  const allPages = await client.fetch(
    `{'slugs': *[_type == "${doc}"]{ 
          'pageType': pageType->slug.current , 
          'slug': slug.current ,
          'preparedSlug': select(defined(pageType)=> pageType->slug.current +'/'+ slug.current,slug.current ),
          ${i18nQuery}
          'isHome':*[_id == 'siteConfig'][0].indexPage._ref == @._id 
        },
        'homeSlug':*[_id == 'siteConfig'][0].indexPage->slug.current 
       
        }`
  );

  console.log(allPages);

  if (!allPages || !allPages.slugs || !Array.isArray(allPages.slugs)) {
    throw new Error("No Path returned");
  }
  return allPages;
};

export default getAllSlugs;
