import Underline from "components/Atoms/Underline/Underline";

import React, { ReactNode } from "react";

type HandUnderlineMarkProps = {
  color?: string;
  variant: string;
  on?: "scroll";
  children?: ReactNode | undefined;
};

const variantMap: { [k: string]: number } = {
  line1: 0,
  line2: 1,
  line3: 2,
  circle1: 3,
  circle2: 4,
};

const HandUnderlineMark: React.FC<HandUnderlineMarkProps> = (props) => {
  const { color = "primary", variant, on } = props;

  return (
    <Underline on={on || "init"} color={color} variant={variantMap[variant]}>
      {props.children}
    </Underline>
  );
};

export default HandUnderlineMark;
