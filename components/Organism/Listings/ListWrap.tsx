import Content, {
  ContentSource,
  validateContentSource,
} from "components/Atoms/Content";
import Section, { ISectionProps } from "components/Atoms/Section/Section";
import getSectionSpaceClasses, {
  IUseSectionWidthProps,
} from "components/Atoms/Section/getSectionSpaceClasses";

interface ListWrapProps {
  content?: ContentSource;
  space?: boolean;
  children?: React.ReactNode;
}

const ListWrap: React.FC<
  ListWrapProps & ISectionProps & IUseSectionWidthProps
> = (props) => {
  const {
    children,
    content,
    width = "l",
    topSpace,
    bottomSpace,
    ...rest
  } = props;

  const spaceClasses = getSectionSpaceClasses({ bottomSpace, topSpace });
  return (
    <Section {...rest} width={width || "m"} className={spaceClasses}>
      {validateContentSource(content) && <Content content={content} />}
      {children}
    </Section>
  );
};

export default ListWrap;
