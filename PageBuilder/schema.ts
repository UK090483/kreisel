import heroSchema from "./Blocks/hero/hero.schema";
import listingSchema from "./Blocks/listingBlock/listingBlock.schema";
import {
  reusableBlock,
  reusableDocument,
} from "./Blocks/reuseableBlock/reusable.schema";
import SectionSchema from "./Blocks/sectionBlock/sectionBlock.schema";
import {
  trustBlockSchema,
  trustBlockItem,
} from "./Blocks/trustBlock/trustBlock.schema";
import { defaultRichTextSchema } from "./RichText/defaultRichtext/defaultRichText.schema";

const schema = [
  heroSchema,
  listingSchema,
  trustBlockSchema,
  trustBlockItem,
  reusableBlock,
  reusableDocument,
  SectionSchema,

  defaultRichTextSchema,
];

export default schema;
