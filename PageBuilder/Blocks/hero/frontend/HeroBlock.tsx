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
      className={clsx(spaceClasses, "relative  grid", {
        "min-h-[95vh]": size === "full",
        "min-h-[50vh]": size === "1/2",
        "min-h-[66vh]": size === "2/3",
        "min-h-[33vh]": size === "1/3",
        "px-[10%]": isFull,
        "md:grid-cols-[2fr,1fr]": isHalf,
      })}
    >
      {isFull && (
        <div>
          <SanityImage src={mainImage} fill className="object-cover" />
          <div
            className={clsx("absolute inset-0", {
              " bg-primary-light ":
                filterColor === "primary-light" && !!filterIntensity,
              "bg-white ": filterColor === "white" && !!filterIntensity,
              "opacity-10": filterIntensity === "10",
              "opacity-20": filterIntensity === "20",
              "opacity-30": filterIntensity === "30",
              "opacity-40": filterIntensity === "40",
              "opacity-50": filterIntensity === "50",
              "opacity-60": filterIntensity === "60",
              "opacity-70": filterIntensity === "70",
              "opacity-80": filterIntensity === "80",
              "opacity-90": filterIntensity === "90",
            })}
          ></div>
        </div>
      )}
      <div className="order-2 flex w-full items-center break-words md:order-1">
        <div className="max-w-full">
          {content ? (
            <RichText content={content} />
          ) : (
            <Typo as="h1" variant="h1">
              {title}
            </Typo>
          )}
        </div>
      </div>
      {isHalf && (
        <div className=" relative order-1 my-8 min-h-[250px] md:order-2 md:my-0">
          <SanityImage src={mainImage} fill className="object-contain" />
        </div>
      )}
    </Section>
  );
};

export default HeroBlock;
