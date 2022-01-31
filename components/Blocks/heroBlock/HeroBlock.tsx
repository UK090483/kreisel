import { Section } from "@components/Section/Section";
import Typo from "@components/Typography/Typography";
import Underline from "@components/Underline";
import { imageMeta, ImageMetaResult } from "@privateModules/SanityImage/query";
import React from "react";
import { AppLocales } from "types";
import Kreisel from "@components/Kreisel";

export const heroBlockQuery = `
_type == "hero" => {
    _type,
    _key,
 'photo':image{${imageMeta}},
 title,
 text,
 filterIntensity,
 filterColor,
 size,
 content
}
`;

export interface HeroBlogResult {
  _type: "hero";
  _key: string;
  content?: any;
  photo?: ImageMetaResult;
  title?: string;
  text?: string;
  btnText?: string;
  btnLink?: string;
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
}

export interface HeroBlockProps extends HeroBlogResult {
  lang: AppLocales;
}

const HeroBlock: React.FC<HeroBlockProps> = (props) => {
  const { content, photo, size } = props;
  return (
    <Section width="l" bg="secondary" className=" h-[85vh] grid grid-cols-2 ">
      <div className="flex items-center mx-auto text-white  ml-[10%] ">
        <Typo hand variant="h1">
          <div style={{ fontSize: 72 }}>
            Grundlagen <br /> Lernförderung <br />
            <Underline color="primary"> & Lerntherapie</Underline>
          </div>
        </Typo>
      </div>
      <div className="relative flex justify-center items-center animate-fadeIn">
        <Kreisel />
        {/* <SanityImage image={photo} objectFit="contain" /> */}
      </div>
    </Section>
  );
};

export default HeroBlock;
