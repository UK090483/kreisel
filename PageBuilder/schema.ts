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
import articleSchema from "./ContentTypes/Article/article.schema";
import memberSchema from "./ContentTypes/Members/member.schema";
import { PageSchema, pageTypeSchema } from "./ContentTypes/Page/page.schema";
import personSchema from "./ContentTypes/Person/person.schema";
import { tagSchema, tagsSchema } from "./ContentTypes/Tags/Tag.schema";
import testimonialSchema from "./ContentTypes/Testimonials/testimonial.schema";
import defaultImageSchema from "./Image/defaultImage.schema";
import Navigation from "./Navigation/Navigation.schema";
import linkSchema from "./objects/link/link.schema";
import { defaultRichTextSchema } from "./RichText/defaultRichtext/defaultRichText.schema";
import easyRichtextSchema from "./RichText/easyRichtext/easyRichtext.schema";
import headerRichTextSchema from "./RichText/headerRichText/headerRichText.schema";
import underlineSchema from "./RichText/marks/HandUnderline/underline.schema";
import tooltipSchema, {
  tooltipPlug,
} from "./RichText/marks/Tooltip/tooltip.schema";
import embedHTMLSchema from "./RichText/Plugs/EmbedHTML/embedHTML.schema";
import eventPlugSchema from "./RichText/Plugs/EventPlug/eventPlug.schema";
import gSheetSchema from "./RichText/Plugs/GSheet/gSheet.schema";
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
import seoSchema from "./Seo/seo.schema";
import siteConfigSchema, {
  contactItemSchema,
} from "./Settings/SiteConfig.schema";

const schema = [
  // Plugs
  tooltipSchema,
  tooltipPlug,
  gSheetSchema,
  ImagePlugSchema,
  imageGalleryPlugSchema,
  imageGalleryPlugItemSchema,
  eventPlugSchema,
  embedHTMLSchema,
  infoblockPlug,
  infoblockPlugItem,
  spacerSchema,
  underlineSchema,
  // Config

  siteConfigSchema,
  contactItemSchema,
  // objects

  ...Navigation,
  linkSchema,
  tagSchema,
  tagsSchema,
  seoSchema,
  // ContentTypes
  PageSchema,
  pageTypeSchema,
  testimonialSchema,
  personSchema,
  memberSchema,
  articleSchema,
  // RichText
  defaultRichTextSchema,
  defaultImageSchema,
  headerRichTextSchema,
  easyRichtextSchema,
  // Blocks
  heroSchema,
  listingSchema,
  trustBlockSchema,
  trustBlockItem,
  reusableBlock,
  reusableDocument,
  SectionSchema,

  //

  // underlineSchema,
];

export default schema;
