import { GetStaticPropsResult } from "next";
import { fetchStaticPropsProps, PageProps } from "../../types";

export async function fetchStaticProps<P>(
  props: fetchStaticPropsProps
): Promise<GetStaticPropsResult<PageProps<P>>> {
  const {
    params,
    client,
    locale,
    preview,
    query,
    locales,
    revalidate,
    previewQuery,
  } = props;

  if (!params) {
    throw new Error("No params in getStaticProps");
  }

  const slug = params && params.slug && params.slug[params.slug.length - 1];

  const localizedQuery = (slug: string) =>
    Object.keys(locales).reduce((acc, item) => {
      //@ts-ignore
      if (!locales[item].isDefault) {
        return `${acc} || slug_${item}.current == "${slug}"`;
      }
      return acc;
    }, `slug.current == "${slug}"`);

  const filter = slug
    ? `_type == "page" && (${localizedQuery(slug)})`
    : `_id == *[_id == 'siteConfig'][0].indexPage._ref`;

  const fetch = `*[${filter}][0]{
   ${query}
  }`;

  const previewFetch = `*[${filter}][0]{
    ${previewQuery}
   }`;

  const data = await client.fetch(fetch);

  if (!data) {
    return { notFound: true, revalidate };
  }

  return {
    props: {
      data,
      preview: preview || false,
      query: preview ? (previewQuery ? previewFetch : fetch) : "",
      id: slug || "noId",
    },
    revalidate,
  };
}

export default fetchStaticProps;
