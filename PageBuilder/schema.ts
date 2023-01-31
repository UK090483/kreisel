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
import { PageSchema, pageTypeSchema } from "./ContentTypes/Page/page.schema";
import personSchema from "./ContentTypes/Person/person.schema";
import { tagSchema, tagsSchema } from "./ContentTypes/Tags/Tag.schema";
import testimonialSchema from "./ContentTypes/Testimonials/testimonial.schema";
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
import spacerSchema from "./RichText/Plugs/Spacer/spacer.schema";
import siteConfigSchema, {
  contactItemSchema,
} from "./Settings/SiteConfig.schema";

const schema = [
  // Config

  siteConfigSchema,
  contactItemSchema,
  // objects

  tagSchema,
  tagsSchema,
  // ContentTypes
  PageSchema,
  pageTypeSchema,
  testimonialSchema,
  personSchema,
  // RichText
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
  spacerSchema,
];

export default schema;
