import { HeroBlogResult } from "../hero.query";
import { Section } from "components/Section/Section";
import useSectionSpace from "components/Section/useSectionSpace";
import SanityImage from "PageBuilder/Image/frontend/SanityImage";
import RichText from "PageBuilder/RichText/PortableText";
import Typo from "components/Typography/Typography";
import clsx from "clsx";
import React from "react";

const HeroBlock: React.FC<HeroBlogResult> = (props) => {
  const {
    content,
    image,
    variant = "full",
    size = "full",
    bgColor,
    transitionTop,
    transitionBottom,
    topSpace,
    bottomSpace,
    title,
  } = props;

  const isFull = variant === "full";
  const isHalf = variant === "half" || variant === null;
  const spaceClasses = useSectionSpace({ topSpace, bottomSpace });
  const mainImage = image;

  return (
    <Section
      transitionTop={transitionTop}
      transitionBottom={transitionBottom}
      bg={bgColor}
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
            <RichText content={content} />
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
        <SanityImage
          sizes="1000"
          src={mainImage}
          fill
          className="mx-auto w-full max-w-[1800px] object-cover"
        />
      </div>
    </Section>
  );
};

export default HeroBlock;
