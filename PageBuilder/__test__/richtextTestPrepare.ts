type SanityBlock = any;

import { v4 as uuid } from "uuid";

interface GetTestBlockProps extends Partial<SanityBlock> {}

type SpanProps = {
  text: string;
  marks?: string[];
};
export const span = (props: SpanProps) => {
  return {
    _key: uuid(),
    _type: "span",
    marks: props.marks || [],
    text: props.text,
  };
};
export const getTestBlock = (props: GetTestBlockProps = {}) => {
  return {
    _key: uuid(),
    _type: "block",
    children: [span({ text: "testText" })],
    style: "normal",
    markDefs: [],
    ...props,
  } as SanityBlock;
};

type TextBlockProps = {
  text?: string;
  style?: string;
  marks?: string[];
};
export const textBlock = (props?: TextBlockProps) => {
  return getTestBlock({
    style: props?.style || "normal",

    children: [
      //@ts-ignore
      span({ text: props?.text || "textBlock", marks: props?.marks || [] }),
    ],
  });
};
