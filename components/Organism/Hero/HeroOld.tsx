/* eslint-disable jsx-a11y/alt-text */
import Section, { ISectionProps } from "components/Atoms/Section/Section";
import getSectionSpaceClasses, {
  IUseSectionWidthProps,
} from "components/Atoms/Section/getSectionSpaceClasses";
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
  const spaceClasses = getSectionSpaceClasses({
    topSpace,
    bottomSpace,
    defaultSpace: "noSpace",
  });
  const mainImage = image;

  return (
    <Section
      {...rest}
      width={isFull ? "full" : "m"}
      className={clsx(spaceClasses, "relative grid grid-cols-1", {
        "min-h-[95vh]": size === "full",
        "min-h-[50vh]": size === "1/2",
        "min-h-[66vh]": size === "2/3",
        "min-h-[33vh]": size === "1/3",
        "sm:grid-cols-2": isHalf,
      })}
    >
      <div
        className={clsx(
          "z-10 self-end break-words",
          "order-1 px-3 sm:order-2",
          {
            "mx-auto w-full max-w-screen-lg ": isFull,
            "sm:row-span-1 sm:row-start-1   ": isFull,
          }
        )}
      >
        <div className={clsx({ "": isFull })}>
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
        className={clsx("sm:order-2", "min-h-[300px]", {
          "relative ": isHalf,
          "relative row-span-1 row-start-1 sm:static   ": isFull,
        })}
      >
        <Image
          sizes="1000"
          src={mainImage}
          fill
          className="mx-auto w-full max-w-[1800px] object-cover"
        />
      </div>
    </Section>
  );
};

export default Hero;
