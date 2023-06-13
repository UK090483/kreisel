import { SectionBlockResult } from "../SectionBlockQuery";
import { Section } from "components";
import React from "react";

const SectionBlock: React.FC<SectionBlockResult> = (props) => {
  return <Section {...props} />;
};

export default SectionBlock;
