import RichText from "@components/RichText/RichText";
import { Section } from "@components/Section/Section";

import * as React from "react";
import TrustBlockItem, {
  ITrustBlockItem,
  trustBlockItemQuery,
} from "./TrustBlockItem";

export const trustBlockQuery = `
_type == "trust" => {
  ...,
  'items':items[]{
   ${trustBlockItemQuery}
  }
}

`;

interface ITrustProps {
  bgColor?: "black" | "white" | "primary" | "secondary" | "grey";
  content?: null | any;
  items?: ITrustBlockItem[] | null;
  transitionTop?: "tearOff" | null;
  transitionBottom?: "tearOff" | null;
}

const TrustBlock: React.FunctionComponent<ITrustProps> = (props) => {
  const { items, bgColor, content, transitionTop, transitionBottom } = props;

  const hasContent = content && content.length > 0;
  return (
    <Section
      transitionBottom={transitionBottom}
      transitionTop={transitionTop}
      width="l"
      bg={bgColor}
    >
      {hasContent && (
        <div className=" py-16 ">
          <RichText content={content} />
        </div>
      )}
      <div
        className={` grid grid-cols-1  md:grid-cols-2  lg:grid-cols-4  ${
          hasContent ? "pb-16" : "py-32"
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
