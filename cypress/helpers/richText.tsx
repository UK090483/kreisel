import { PortableTextBlock } from "sanity";

export const getKey = () => Math.random() + "";

export const getChild = (props: Partial<PortableTextBlock["children"][0]>) =>
  ({
    _type: "span",
    _key: getKey(),
    text: "testText",
    marks: [],
    ...props,
  } as PortableTextBlock["children"][0]);

export const getBlock = (props: Partial<PortableTextBlock>) => {
  return {
    _key: getKey(),
    _type: "block",
    level: 1,

    markDefs: [],

    style: "normal",
    ...props,
  } as PortableTextBlock;
};
