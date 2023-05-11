import { HeroBlogResult } from "../hero.query";
import { Hero } from "components";
import React from "react";

const HeroBlock: React.FC<HeroBlogResult> = (props) => {
  return <Hero {...props} />;
};

export default HeroBlock;
