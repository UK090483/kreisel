import { SpacerPlugResult } from "../spacer.query";

import React from "react";
import clsx from "clsx";

const SpacerPlug: React.FC<SpacerPlugResult> = (props) => {
  const space = props.space;

  return (
    <div
      className={clsx(
        { "pb-10": space === "s" },
        { "pb-20": space === "m" },
        { "pb-32": space === "l" },
        { "pb-44": space === "xl" },
        { "pb-60": space === "xxl" }
      )}
    />
  );
};

export default SpacerPlug;

export {};
