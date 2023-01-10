import heroSchema from "./Blocks/hero/hero.schema";
import listingSchema from "./Blocks/listingBlock/listingBlock.schema";
import {
  reusableBlock,
  reusableDocument,
} from "./Blocks/reuseableBlock/reusable.schema";

const schema = [heroSchema, listingSchema, reusableBlock, reusableDocument];

export default schema;
