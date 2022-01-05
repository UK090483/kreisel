import SectionBlock, {
  sectionBlockQuery,
  SectionResult,
} from "./Blocks/sectionBlock/SectionBlock";
import BodyParser from "./lib/BodyParser";
import { blockFactory } from "./lib/BlockFactory";

import HeroBlock, { heroBlockQuery } from "./Blocks/heroBlock/HeroBlock";
import ListingBlock, {
  listingBlockQuery,
  ListingBlockResult,
} from "./Blocks/listingBlock/ListingsBlock";
import onPageNav, { onPageNavBlockQuery } from "./Blocks/onPageNav/OnPageNav";

export type PageBodyResult = (SectionResult | ListingBlockResult)[];
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
  {
    name: "onPageNav",
    component: onPageNav,
    type: "root",
    query: onPageNavBlockQuery,
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
