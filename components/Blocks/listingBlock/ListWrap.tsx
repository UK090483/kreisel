import RichText from "@components/RichText/RichText";
import { Section } from "@components/Section/Section";
import useSectionSpace from "@components/Section/useSectionSpace";
import clsx from "clsx";
import { AppColor } from "types";
import { SectionBase } from "../sectionBlock/SectionBlockQuery";

interface ListWrapProps extends SectionBase {
  content?: any[];
  space?: boolean;
}

const ListWrap: React.FC<ListWrapProps> = (props) => {
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
      width={width}
      bg={bgColor}
      className={spaceClasses}
    >
      {hasContent && <RichText content={content} />}
      {children}
    </Section>
  );
};

export default ListWrap;
