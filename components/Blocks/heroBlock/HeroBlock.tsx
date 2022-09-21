import { imageMeta, ImageMetaResult } from "@lib/SanityImage/query";
import React from "react";
import { AppLocales } from "types";
import Kreisel from "@components/Kreisel";
import SanityImage from "@lib/SanityImage";
import RichText from "@components/RichText/RichText";
import clsx from "clsx";
import { Section } from "@components/Section/Section";
import { IBlockStyle } from "../types";

export const heroBlockQuery = `
_type == "hero" => {
  ...,
  _type,
  _key,
 'photo':image{${imageMeta}},
}
`;

export interface HeroBlogResult extends IBlockStyle {
  _type: "hero";
  _key: string;
  content?: any;
  photo?: ImageMetaResult;
  title?: string;
  text?: string;
  filterIntensity?:
    | "0"
    | "10"
    | "20"
    | "30"
    | "40"
    | "50"
    | "60"
    | "70"
    | "80"
    | "90";
  filterColor?: "white" | "black";
  size?: "full" | "1/2" | "2/3" | "1/3";
  variant?: "full" | "half";
}

const HeroBlock: React.FC<HeroBlogResult> = (props) => {
  const {
    content,
    photo,
    variant = "full",
    size = "full",
    bgColor,
    transitionTop,
    transitionBottom,
  } = props;

  const isFull = variant === "full" || variant === null;
  const isHalf = variant === "half";

  return (
    <Section
      transitionTop={transitionTop}
      transitionBottom={transitionBottom}
      bg={bgColor}
      width={isFull ? "full" : "m"}
      className={clsx("grid  relative", {
        "min-h-[95vh]": size === "full",
        "min-h-[50vh]": size === "1/2",
        "min-h-[66vh]": size === "2/3",
        "min-h-[33vh]": size === "1/3",
        "px-[10%]": isFull,
        "md:grid-cols-[2fr,1fr]": isHalf,
      })}
    >
      {photo && isFull && <SanityImage image={photo} objectFit="cover" />}
      <div className=" flex  items-center w-full order-2 md:order-1 break-words">
        <div className=" max-w-full    ">
          <RichText content={content} />
        </div>
      </div>
      {photo && isHalf && (
        <div className=" relative order-1 md:order-2 min-h-[250px] mt-8 md:mt-0">
          <SanityImage image={photo} objectFit="contain" />
        </div>
      )}
    </Section>
  );
  // return (
  //   <div className="relative h-[95vh] grid grid-cols-2 bg-primary-light">
  //     {photo && isFull && <SanityImage image={photo} objectFit="cover" />}
  //     <div className={clsx("z-10 flex items-center mx-auto ml-[10%]  ")}>
  //       <RichText content={content} />
  //     </div>

  //     <div className="z-0 relative flex justify-center items-center animate-fadeIn">
  //       {photo && isHalf && <SanityImage image={photo} objectFit="contain" />}
  //       {!photo && <Kreisel className="h-[50vh]" />}
  //     </div>
  //   </div>
  // );
};

export default HeroBlock;
