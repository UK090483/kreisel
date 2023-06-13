import { withTimeLog } from "@lib/utils";
import { sanityClient } from "@services/SanityService/sanity.server";
import { notFound } from "next/navigation";

import { contentQuery, ContentResult } from "PageBuilder/composedQueries";

const getPageData = async (slug: string) => {
  const result = await sanityClient.fetch<ContentResult>(
    `*[ _type == "page" && slug.current == $slug ][0]{${contentQuery}}`,
    {
      slug,
    }
  );
  if (!result) {
    notFound();
  }
  return result;
};

export default withTimeLog(
  getPageData,
  (id, slug) => `fetch pageData_${id} slug: ${slug} in`
);