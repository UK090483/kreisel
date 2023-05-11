/* eslint-disable jsx-a11y/alt-text */
import Accordion from "../../Molecules/Accordion";
import Section, { ISectionProps } from "components/Atoms/Section/Section";
import Image, { ImageSrc } from "components/Atoms/Image";
import Content, { ContentSource } from "components/Atoms/Content";

import getSectionSpaceClasses, {
  IUseSectionWidthProps,
} from "components/Atoms/Section/getSectionSpaceClasses";
import clsx from "clsx";
import React from "react";

interface ISectionBlockProps {
  content: ContentSource;
  bgImage?: ImageSrc;
  image?: ImageSrc;
  title?: string;
  type?: "accordion";
  textDirection?: "center" | null;
  _key: string;
}

const SectionBlock: React.FC<
  ISectionBlockProps & ISectionProps & IUseSectionWidthProps
> = (props) => {
  const {
    content,
    bottomSpace,
    topSpace,
    title,
    image,
    width,
    type,
    textDirection,
    _key,
    ...rest
  } = props;
  //@ts-ignore
  const hasImage = image && image?.url;
  const autoWidth = hasImage ? "l" : "s";
  const isAccordion = type === "accordion";

  const spaceClasses = getSectionSpaceClasses({
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
        {...rest}
        width={width || autoWidth}
        {...(title && { id: title })}
        className={clsx(spaceClasses, {
          "grid  grid-cols-1  lg:grid-cols-2 ": hasImage,
          "text-center": textDirection === "center",
        })}
      >
        {hasImage ? (
          <WithImage place="right" image={image}>
            {!!content && <Content content={content} />}
          </WithImage>
        ) : (
          <>{!!content && <Content content={content} />} </>
        )}
      </Section>
    </Accordion>
  );
};

const WithImage: React.FC<{
  place: "left" | "right";
  image: ImageSrc;
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
        <Image src={image} fill className="object-cover " />
      </div>
      {place === "left" && content}
    </>
  );
};

export default SectionBlock;
