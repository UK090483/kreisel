export interface IBlockSpace {
  topSpace?: "s" | "m" | "l" | "xl" | "xxl";
  bottomSpace?: "s" | "m" | "l" | "xl" | "xxl";
}

export interface IBlockStyle extends IBlockSpace {
  transitionTop?: "tearOff" | null;
  transitionBottom?: "tearOff" | null;
  bgColor?: "black" | "white" | "primary" | "secondary" | "grey";
  width?: "m" | "l" | "s" | "full";
}
