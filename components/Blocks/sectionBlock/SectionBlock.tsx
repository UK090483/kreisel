import React from "react";
import clsx from "clsx";
import RichText from "../../RichText/RichText";
import { Section } from "@components/Section/Section";
import SanityImage from "@lib/SanityImage";
import Accordion from "./Accordion";
import { ImageMetaResult } from "@lib/SanityImage/query";
import { SectionBlockResult } from "./SectionBlockQuery";

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

  return (
    <Accordion condition={type === "accordion"} title={title}>
      <Section
        bg={bgColor}
        width={width || autoType}
        {...(title && { id: title })}
        transitionTop={transitionTop}
        transitionBottom={transitionBottom}
        className={clsx({
          "pt-5 md:pt-10": topSpace === "s",
          "pt-9 md:pt-20": topSpace === "m" || topSpace === null,
          "pt-12 md:pt-32": topSpace === "l",
          "pt-16 md:pt-44": topSpace === "xl",
          "pt-24 md:pt-60": topSpace === "xxl",
          "pb-5 md:pb-10": bottomSpace === "s",
          "pb-9 md:pb-20": bottomSpace === "m" || bottomSpace === null,
          "pb-16 md:pb-32": bottomSpace === "l",
          "pb-12 md:pb-44": bottomSpace === "xl",
          "pb-24 md:pb-60": bottomSpace === "xxl",
          "pb-0.5": !bottomSpace,
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
