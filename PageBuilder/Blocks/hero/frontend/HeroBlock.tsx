import { HeroBlogResult } from "../hero.query";
import { Section } from "components/Section/Section";
import useSectionSpace from "components/Section/useSectionSpace";
import SanityImage from "PageBuilder/Image/frontend/SanityImage";
import RichText from "PageBuilder/RichText/RichText";
import clsx from "clsx";
import React from "react";

const HeroBlock: React.FC<HeroBlogResult> = (props) => {
  const {
    content,
    photo,
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

  const isFull = variant === "full" || variant === null;
  const isHalf = variant === "half";

  const spaceClasses = useSectionSpace({ topSpace, bottomSpace });

  return (
    <Section
      transitionTop={transitionTop}
      transitionBottom={transitionBottom}
      bg={bgColor}
      width={isFull ? "full" : "m"}
      className={clsx(spaceClasses, "grid  relative", {
        "min-h-[95vh]": size === "full",
        "min-h-[50vh]": size === "1/2",
        "min-h-[66vh]": size === "2/3",
        "min-h-[33vh]": size === "1/3",
        "px-[10%]": isFull,
        "md:grid-cols-[2fr,1fr]": isHalf,
      })}
    >
      {photo && isFull && (
        <div>
          <SanityImage src={photo} fill className=" object-cover " />
          <div
            className={clsx(" absolute inset-0 å", {
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
      <div className=" flex  items-center w-full order-2 md:order-1 break-words">
        <div className=" max-w-full    ">
          <RichText content={content} />
        </div>
      </div>
      {photo && isHalf && (
        <div className=" relative order-1 md:order-2 min-h-[250px] my-8 md:my-0">
          <SanityImage src={photo} fill className="object-contain " />
          {/* <SanityImage image={photo} objectFit="contain" /> */}
        </div>
      )}
    </Section>
  );
};

export default HeroBlock;