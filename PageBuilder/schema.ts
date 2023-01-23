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
import defaultImageSchema from "./Image/defaultImage.schema";
import { defaultRichTextSchema } from "./RichText/defaultRichtext/defaultRichText.schema";
import eventPlugSchema from "./RichText/Plugs/EventPlug/eventPlug.schema";
import ImagePlugSchema from "./RichText/Plugs/ImagePlug/ImagePlug.schema";

const schema = [
  heroSchema,
  listingSchema,
  trustBlockSchema,
  trustBlockItem,
  reusableBlock,
  reusableDocument,
  SectionSchema,

  defaultRichTextSchema,
  defaultImageSchema,

  ImagePlugSchema,
  eventPlugSchema,
];

export default schema;
