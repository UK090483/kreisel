import { withTimeLog } from "@lib/utils";
import { sanityClient } from "@services/SanityService/sanity.server";
import { heroBlockQuery } from "PageBuilder/Blocks/hero/hero.query";
import { listingBlockQuery } from "PageBuilder/Blocks/listingBlock/listingBlock.query";
import { reusableBlockQuery } from "PageBuilder/Blocks/reuseableBlock/ReusableBlock.query";
import { sectionBlockQuery } from "PageBuilder/Blocks/sectionBlock/SectionBlockQuery";
import { trustBlockQuery } from "PageBuilder/Blocks/trustBlock/trustBlock.query";
import { notFound } from "next/navigation";

const contentQuery = `content[]{${heroBlockQuery},${sectionBlockQuery},${listingBlockQuery},${trustBlockQuery},${reusableBlockQuery} }`;

const getPageData = async (slug: string) => {
  const result = await sanityClient.fetch(
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
