import { HeroBlogResult } from "../hero.query";
import { Section } from "components/Section/Section";
import useSectionSpace from "components/Section/useSectionSpace";
import SanityImage from "PageBuilder/Image/frontend/SanityImage";
import RichText from "PageBuilder/RichText/PortableText";
import { useAppContext } from "PageBuilder/AppContext/AppContext";
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
    filterIntensity,
    filterColor,
  } = props;

  const isFull = variant === "full";
  const isHalf = variant === "half" || variant === null;

  const spaceClasses = useSectionSpace({ topSpace, bottomSpace });

  const { data } = useAppContext();

  const mainImage = image || data?.image;

  const title = data?.title;

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
        "md:grid-cols-2": isHalf,
      })}
    >
      <div
        className={clsx(
          "z-10 self-end break-words",
          "order-1 px-3 md:order-2",
          {
            "mx-auto w-full max-w-screen-lg": isFull,
            "md:row-span-1 md:row-start-1   ": isFull,
          }
        )}
      >
        {content ? (
          <RichText content={content} />
        ) : (
          <Typo as="h1" variant="h1">
            {title}
          </Typo>
        )}
      </div>

      <div
        className={clsx("md:order-2", "min-h-[200px]", {
          "relative ": isHalf,
          "relative row-span-1 row-start-1 md:static   ": isFull,
        })}
      >
        <SanityImage
          src={mainImage}
          fill
          className="mx-auto w-full max-w-[1800px] object-cover"
        />
      </div>
    </Section>
  );
};

export default HeroBlock;
