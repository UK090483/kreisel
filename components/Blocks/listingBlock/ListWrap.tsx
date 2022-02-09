import RichText from "@components/RichText/RichText";
import { Section } from "@components/Section/Section";
import clsx from "clsx";
import { AppColor } from "types";

type ListWrapProps = {
  bgColor?: AppColor;
  content?: any[];
  space?: boolean;
};

const ListWrap: React.FC<ListWrapProps> = (props) => {
  const { children, bgColor, content, space = true } = props;
  const hasContent = content && content.length > 0;
  return (
    <Section
      width="l"
      bg={bgColor}
      className={clsx({
        "pb-32 pt-16": space && hasContent,
        "py-32": space && !hasContent,
      })}
    >
      {hasContent && <RichText content={content} />}
      {children}
    </Section>
  );
};

export default ListWrap;
