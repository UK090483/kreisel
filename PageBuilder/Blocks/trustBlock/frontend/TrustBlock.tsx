import { trustQueryResult } from "../trustBlock.query";
import Trust from "components/Organism/Trust/Trust";
import * as React from "react";

const TrustBlock: React.FunctionComponent<trustQueryResult> = (props) => {
  return <Trust {...props} />;
};

export default TrustBlock;
