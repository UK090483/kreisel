import listing from "./listing";
import Section from "./Section";
import defaultRichText from "./RichText/defaultRichText";
import hero from "../../../components/Blocks/heroBlock/schema/hero";
import onPageNav from "./onPageNav";
import onPageNavItem from "./onPageNavItem";
import headerRichText from "./RichText/headerRichText";
import easyRichText from "./RichText/easyRichText";
import trust from "./trust";
import trustItem from "./trustItem";

const PageComponents = [
  trust,
  trustItem,
  Section,
  listing,
  defaultRichText,
  headerRichText,
  easyRichText,
  hero,
  onPageNav,
  onPageNavItem,
];

export default PageComponents;
