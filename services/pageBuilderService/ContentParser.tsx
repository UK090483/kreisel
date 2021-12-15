import SectionBlock, {
  sectionBlockQuery,
  SectionResult,
} from "./Blocks/sectionBlock/SectionBlock";
import BodyParser from "./lib/BodyParser";
import { blockFactory } from "./lib/BlockFactory";

import ListingBlock, {
  listingBlockQuery,
  ListingBlogResult,
} from "./Blocks/listingBlock/ListingsBlock";
import HeroBlock, { heroBlockQuery } from "./Blocks/heroBlock/HeroBlock";

export type PageBodyResult = (SectionResult | ListingBlogResult)[];
export type PageQueryResult = { content: PageBodyResult };

blockFactory.registerComponents([
  {
    name: "hero",
    component: HeroBlock,
    type: "root",
    query: heroBlockQuery,
  },
  {
    name: "section",
    component: SectionBlock,
    type: "root",
    query: sectionBlockQuery,
  },
  {
    name: "listing",
    component: ListingBlock,
    type: "root",
    query: listingBlockQuery,
  },
]);

interface ContentParserProps {
  content?: PageBodyResult | null | undefined;
}

const ContentParser: React.FC<ContentParserProps> = (props) => {
  if (!props.content) return null;

  //@ts-ignore
  return <BodyParser blockFactory={blockFactory} {...props} />;
};
export const body = blockFactory.getRootQuery();
export { blockFactory };
export default ContentParser;
