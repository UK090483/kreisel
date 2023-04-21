import Accordion from "./Accordion";
import { SectionBlockResult } from "../SectionBlockQuery";
import RichText from "PageBuilder/RichText/PortableText";
import { Section } from "components/Section/Section";

import SanityImage from "PageBuilder/Image/frontend/SanityImage";
import { ImageResult } from "PageBuilder/Image/sanityImage.query";

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
    textDirection,
    _key,
  } = props;

  const hasImage = image && image.url;
  const autoWidth = hasImage ? "l" : "s";
  const isAccordion = type === "accordion";

  const spaceClasses = useSectionSpace({
    topSpace,
    bottomSpace,
    defaultSpace: isAccordion ? "s" : "m",
  });

  return (
    <Accordion
      condition={isAccordion}
      title={title}
      width={width || autoWidth}
      id={_key}
    >
      <Section
        bg={bgColor}
        width={width || autoWidth}
        {...(title && { id: title })}
        transitionTop={transitionTop}
        transitionBottom={transitionBottom}
        className={clsx(spaceClasses, {
          "grid  grid-cols-1  lg:grid-cols-2 ": hasImage,
          "text-center": textDirection === "center",
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
  image: ImageResult | undefined;
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
      <div className="  aspect-w-16 aspect-h-9  relative overflow-hidden rounded-theme">
        <SanityImage src={image} fill className="object-cover " />
      </div>
      {place === "left" && content}
    </>
  );
};

export default SectionBlock;
