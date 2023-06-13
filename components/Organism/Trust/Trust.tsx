import TrustBlockItem, { ITrustBlockItemProps } from "./TrustBlockItem";

import Content, {
  ContentSource,
  validateContentSource,
} from "components/Atoms/Content";
import Section, { ISectionProps } from "components/Atoms/Section/Section";

import * as React from "react";

interface ITrustBlockProps {
  content?: ContentSource;
  items?: ITrustBlockItemProps[] | null;
}

const Trust: React.FunctionComponent<ITrustBlockProps & ISectionProps> = (
  props
) => {
  const { items, content, bgColor, ...rest } = props;
  const hasContent = validateContentSource(content);

  return (
    <Section {...rest} bgColor={bgColor} width="m">
      {hasContent && (
        <div className=" py-16 ">
          <Content content={content} />
        </div>
      )}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${
          hasContent ? "" : "py-32"
        }`}
      >
        {items &&
          items.map((i) => {
            return <TrustBlockItem key={i._key} {...i} />;
          })}
      </div>
    </Section>
  );
};

export default Trust;
