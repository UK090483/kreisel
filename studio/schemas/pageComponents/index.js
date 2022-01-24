import listing from "./listing";
import Section from "./Section";
import defaultRichText from "./defaultRichText";
import hero from "../../../components/Blocks/heroBlock/schema/hero";
import onPageNav from "./onPageNav";
import onPageNavItem from "./onPageNavItem";
import listingRichText from "./listingRichText";
import trust from "./trust";
import trustItem from "./trustItem";

const PageComponents = [
  trust,
  trustItem,
  Section,
  listing,
  defaultRichText,
  listingRichText,
  hero,
  onPageNav,
  onPageNavItem,
];

export default PageComponents;
