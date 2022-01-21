import RichText from "@components/RichText/RichText";
import { Section } from "@components/organisms/Section/Section";
import { AppColor } from "types";

type ListWrapProps = {
  bgColor?: AppColor;
  content?: any[];
};

const ListWrap: React.FC<ListWrapProps> = (props) => {
  const { children, bgColor, content } = props;
  const hasContent = content && content.length > 0;
  return (
    <Section
      width="l"
      bg={bgColor}
      className={`${hasContent ? "pb-32 pt-16 " : "py-32"} `}
    >
      {hasContent && <RichText content={content} />}
      {children}
    </Section>
  );
};

export default ListWrap;
