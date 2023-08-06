/* eslint-disable jsx-a11y/alt-text */
import Section, { ISectionProps } from "components/Atoms/Section/Section";
import { IUseSectionWidthProps } from "components/Atoms/Section/getSectionSpaceClasses";
import Typo from "components/Atoms/Typography/Typography";
import Image, { ImageSrc } from "components/Atoms/Image";
import Content, { ContentSource } from "components/Atoms/Content";
import clsx from "clsx";
import React from "react";

interface IHeroProps {
  content?: ContentSource;
  image?: ImageSrc;
  title?: string;
  size?: "full" | "1/2" | "2/3" | "1/3";
  variant?: "full" | "half";
}

interface IHeroPropsNew {
  content?: ContentSource;
  image?: ImageSrc;
}

const Hero: React.FC<IHeroProps & ISectionProps & IUseSectionWidthProps> = (
  props
) => {
  const {
    content,
    image,
    variant = "full",
    size = "full",
    topSpace,
    bottomSpace,
    title,
    ...rest
  } = props;

  const isFull = variant === "full";
  const isHalf = variant === "half" || variant === null;
  const mainImage = image;

  return (
    <Section
      {...rest}
      width={isFull ? "full" : "m"}
      className={clsx(
        "relative grid grid-cols-1",
        "min-h-[360px] sm:min-h-[500px]"
      )}
    >
      <div
        className={clsx("z-10 self-end break-words", "px-3", "pb-3", {
          "mx-auto w-full max-w-screen-lg ": isFull,
        })}
      >
        <div className={clsx({ "max-w-[700px]": isFull })}>
          {content ? (
            <Content content={content} />
          ) : (
            <Typo as="h1" variant="h1">
              {title}
            </Typo>
          )}
        </div>
      </div>

      <div
        className={clsx("min-h-[300px] sm:min-h-full", {
          "relative ": isHalf,
          "relative row-span-1 row-start-1 sm:static ": isFull,
        })}
      >
        <Image
          sizes="1000"
          src={mainImage}
          fill
          className="mx-auto w-full max-w-[1920px] object-cover"
        />
      </div>
    </Section>
  );
};

export default Hero;
