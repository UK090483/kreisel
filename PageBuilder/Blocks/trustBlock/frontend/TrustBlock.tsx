import TrustBlockItem from "./TrustBlockItem";
import { trustQueryResult } from "../trustBlock.query";
import RichText from "PageBuilder/RichText/PortableText";
import { Section } from "components/Section/Section";

import * as React from "react";

const TrustBlock: React.FunctionComponent<trustQueryResult> = (props) => {
  const { items, content, bgColor, ...rest } = props;

  const hasContent = content && content.length > 0;
  return (
    <Section {...rest} bg={bgColor} width="m">
      {hasContent && (
        <div className=" py-16 ">
          <RichText content={content} />
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

export default TrustBlock;
