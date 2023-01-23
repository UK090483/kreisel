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
import embedHTMLSchema from "./RichText/Plugs/EmbedHTML/embedHTML.schema";
import eventPlugSchema from "./RichText/Plugs/EventPlug/eventPlug.schema";
import {
  imageGalleryPlugItemSchema,
  imageGalleryPlugSchema,
} from "./RichText/Plugs/ImageGaleriePlug/ImageGaleriePlug.schema";

import ImagePlugSchema from "./RichText/Plugs/ImagePlug/ImagePlug.schema";
import {
  infoblockPlug,
  infoblockPlugItem,
} from "./RichText/Plugs/InfoBoxPlug/InfoBoxPlug.schema";

const schema = [
  defaultRichTextSchema,
  defaultImageSchema,
  // Blocks
  heroSchema,
  listingSchema,
  trustBlockSchema,
  trustBlockItem,
  reusableBlock,
  reusableDocument,
  SectionSchema,
  // Plugs
  ImagePlugSchema,
  imageGalleryPlugSchema,
  imageGalleryPlugItemSchema,
  eventPlugSchema,
  embedHTMLSchema,
  infoblockPlug,
  infoblockPlugItem,
];

export default schema;
