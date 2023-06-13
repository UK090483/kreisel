/* eslint-disable import/no-unused-modules */
import { sizesList, colorList, SizeList } from "./snippets";

export const blockWidth = () => [
  {
    title: "Width",
    name: "width",
    type: "string",
    options: {
      list: [
        { title: "Medium", value: "m" },
        { title: "Wide", value: "l" },
        { title: "Narrow", value: "s" },
      ],
    },
    group: "style",
  },
];

export const blockWidthProjection = () => `width,`;
export type BlockWidth = {
  width?: "m" | "l" | "s" | null;
};

export const blockTransitions = () => [
  {
    title: "Übergang Oben",
    name: "transitionTop",
    type: "string",
    options: {
      list: [{ title: "Abgerissen", value: "tearOff" }],
    },
    group: "style",
    // fieldset: "transitions",
  },
  {
    title: "Übergang Unten",
    name: "transitionBottom",
    type: "string",
    options: {
      list: [{ title: "Abgerissen", value: "tearOff" }],
    },
    group: "style",
    // fieldset: "transitions",
  },
];

export const blockTransitionProjection = () =>
  `transitionTop,transitionBottom,`;

export type BlockTransition = {
  transitionTop?: "tearOff" | null;
  transitionBottom?: "tearOff" | null;
};

export const blockSpace = () => [
  {
    title: "Top Space",
    name: "topSpace",
    type: "string",

    options: {
      list: [...sizesList()],
    },
    group: "style",
    // fieldset: "transitions",
  },
  {
    title: "Bottom Space",
    name: "bottomSpace",
    type: "string",
    // fieldset: "transitions",

    options: {
      list: [...sizesList()],
    },
    group: "style",
  },
];

export const blockSpaceProjection = () => `bottomSpace,topSpace,`;

export type BlockSpace = {
  bottomSpace?: SizeList | null;
  topSpace?: SizeList | null;
};

export const blockBgColor = () => [
  {
    title: "Background Color",
    name: "bgColor",
    type: "string",
    options: {
      list: [...colorList()],
    },
    group: "style",
  },
];

export const blockBgColorProjection = () => `bgColor,`;

export type BlockBgColor = {
  bgColor?: string;
};

export const blockStyle = () => {
  return [
    ...blockBgColor(),
    ...blockTransitions(),
    ...blockSpace(),
    ...blockWidth(),
  ];
};
export default blockStyle;

export const blockStyleProjection = () =>
  `${blockTransitionProjection()}
    ${blockBgColorProjection()}  
    ${blockSpaceProjection()}
    ${blockWidthProjection()}`;

export type BlockStyle = BlockTransition &
  BlockBgColor &
  BlockSpace &
  BlockWidth;
