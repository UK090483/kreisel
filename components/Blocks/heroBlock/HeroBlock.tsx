import { Section } from "@components/Section/Section";
import Typo from "@components/Typography/Typography";
import Underline from "@components/Underline/Underline";
import { imageMeta, ImageMetaResult } from "@lib/SanityImage/query";
import React from "react";
import { AppLocales } from "types";
import Kreisel from "@components/Kreisel";
import SanityImage from "@lib/SanityImage";
import RichText from "@components/RichText/RichText";

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
    <div className="relative h-[95vh] grid grid-cols-2 bg-primary-light">
      {photo && <SanityImage image={photo} objectFit="cover" />}
      <div className="z-10 flex items-center mx-auto ml-[10%] ">
        <RichText content={content} />
      </div>

      <div className="z-0 relative flex justify-center items-center animate-fadeIn">
        {!photo && <Kreisel className="h-[50vh]" />}
      </div>
    </div>
  );
};

export default HeroBlock;

// const HeroBlock: React.FC<HeroBlockProps> = (props) => {
//   const { content, photo, size } = props;
//   return (
//     <Section width="l" bg="secondary" className=" h-[85vh] grid grid-cols-2  ">
//       <div className="z-10 flex items-center mx-auto  ml-[10%] ">
//         <Typo variant="h1">
//           <div className=" md:text-[72px] ">
//             Weiterbildung. Lerntherapeutische Förderung. Netzwerk.
//           </div>
//         </Typo>
//       </div>
//       <div className="z-0 relative flex justify-center items-center animate-fadeIn">
//         <Kreisel />
//         {/* <SanityImage image={photo} objectFit="contain" /> */}
//       </div>
//     </Section>
//   );
// };
