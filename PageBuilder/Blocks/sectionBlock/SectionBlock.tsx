import Accordion from "./Accordion";
import { SectionBlockResult } from "./SectionBlockQuery";
import RichText from "../../RichText/RichText";
import { Section } from "components/Section/Section";
import SanityImage from "lib/SanityImage";
import { ImageMetaResult } from "lib/SanityImage/query";
import useSectionSpace from "components/Section/useSectionSpace";
import clsx from "clsx";
import React from "react";

interface SectionBlockProps extends SectionBlockResult {}

const SectionBlock: React.FC<SectionBlockProps> = (props) => {
  const {
    content,
    bottomSpace,
    topSpace,
    title,
    image,
    bgColor,
    width,
    type,
    transitionTop,
    transitionBottom,
  } = props;

  const hasImage = image && image.type;
  const autoType = hasImage ? "l" : "s";

  const spaceClasses = useSectionSpace({ topSpace, bottomSpace });

  return (
    <Accordion
      condition={type === "accordion"}
      title={title}
      width={width || autoType}
    >
      <Section
        bg={bgColor}
        width={width || autoType}
        {...(title && { id: title })}
        transitionTop={transitionTop}
        transitionBottom={transitionBottom}
        className={clsx(spaceClasses, {
          "grid  grid-cols-1  lg:grid-cols-2 ": hasImage,
        })}
      >
        {hasImage ? (
          <WithImage place="right" image={image}>
            {content && <RichText content={content} />}
          </WithImage>
        ) : (
          <>{content && <RichText content={content} />} </>
        )}
      </Section>
    </Accordion>
  );
};

const WithImage: React.FC<{
  place: "left" | "right";
  image: ImageMetaResult | null;
  children?: React.ReactNode;
}> = ({ children, place = "left", image }) => {
  const content = (
    <div
      className={clsx({
        "pr-0  lg:pr-12": place === "right",
        "pl-0  lg:pl-12": place === "left",
      })}
    >
      {children}
    </div>
  );
  return (
    <>
      {place === "right" && content}
      <div className="  relative overflow-hidden  aspect-w-16 aspect-h-9 rounded-theme">
        <SanityImage image={image} objectFit="cover" />
      </div>
      {place === "left" && content}
    </>
  );
};

export default SectionBlock;
