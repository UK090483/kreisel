export interface IBlockSpace {
  topSpace?: "s" | "m" | "l" | "xl" | "xxl";
  bottomSpace?: "s" | "m" | "l" | "xl" | "xxl";
}
export interface IBlockTransition {
  transitionTop?: "tearOff" | null;
  transitionBottom?: "tearOff" | null;
}

export interface IBlockStyle extends IBlockSpace, IBlockTransition {
  bgColor?: "black" | "white" | "primary" | "secondary" | "grey";
  width?: "m" | "l" | "s" | "full";
}
