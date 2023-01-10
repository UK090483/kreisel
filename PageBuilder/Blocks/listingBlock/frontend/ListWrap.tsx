import { ListingBlockProps } from "../listingBlock.query";
import RichText from "PageBuilder/RichText/RichText";
import { Section } from "components/Section/Section";
import useSectionSpace from "components/Section/useSectionSpace";

interface ListWrapProps {
  content?: any[];
  space?: boolean;
  children?: React.ReactNode;
}

const ListWrap: React.FC<ListWrapProps & ListingBlockProps> = (props) => {
  const {
    children,
    bgColor,
    content,
    width = "l",
    transitionTop,
    transitionBottom,
    topSpace,
    bottomSpace,
  } = props;

  const hasContent = content && content.length > 0;
  const spaceClasses = useSectionSpace({ bottomSpace, topSpace });
  return (
    <Section
      transitionTop={transitionTop}
      transitionBottom={transitionBottom}
      width={width || "m"}
      bg={bgColor}
      className={spaceClasses}
    >
      {hasContent && <RichText content={content} />}
      {children}
    </Section>
  );
};

export default ListWrap;
