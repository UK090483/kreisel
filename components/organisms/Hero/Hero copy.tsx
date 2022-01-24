import { Image } from "@components/Image";
import { Section } from "@components/organisms/Section/Section";
import Typo from "@components/Typography";
import Underline from "@components/Underline";
import useCSV from "@hooks/useCsv";
import { ImageMetaResult } from "privateModules/SanityPageBuilder/queries/snippets";

import React from "react";

interface HeroProps {
  variant?: "overlapping" | "sideBySide";
  photo?: ImageMetaResult;
}
const Hero: React.FC<HeroProps> = (props) => {
  const { variant = "overlapping", photo } = props;

  useCSV();
  return (
    <Section width="full" className="relative h-screen">
      <Image image={photo} />
      <div className="absolute inset-0 flex items-center mx-auto text-white  ml-[10%] ">
        <Typo hand variant="h1">
          <div style={{ fontSize: 72 }}>
            Grundlagen <br /> Lernförderung <br />
            <Underline color="primary"> & Lerntherapie</Underline>
          </div>
        </Typo>
      </div>
    </Section>
  );
};

export default Hero;
