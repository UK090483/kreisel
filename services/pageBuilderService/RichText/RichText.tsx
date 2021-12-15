/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */

import React from "react";

import BlockContent, {
  BlockContentProps,
  Serializers,
} from "@sanity/block-content-to-react";

import LinkMark, { linkMarkQuery } from "./marks/link";
import ButtonPlug, { buttonPlugQuery } from "./Plugs/ButtonPlug";
// import { downloadPlugQuery } from "./Plugs/DownLoadPlug";
import EmbedPlug, { embedPlugQuery } from "./Plugs/EmbedPlug";
import ImageGalleryPlug, {
  imageGalleryPlugQuery,
} from "./Plugs/ImageGaleriePlug";
// import { imagePlugQuery } from "./Plugs/ImagePlug";
import Typo from "@components/Typography/Typography";
import SpacerPlug, { spacerPlugQuery } from "./Plugs/Spacer";
import Underline from "@components/Underline";

const marksQuery = `
markDefs[]{
  ...,
  ${linkMarkQuery},
}
`;

// export const richTextQuery = `
// content[]{
//   ...,
//   ${marksQuery},
//   ${buttonPlugQuery},
//   ${embedPlugQuery},
//   ${imagePlugQuery},
//   ${imageGalleryPlugQuery},
//   ${downloadPlugQuery},
// }
//`;
export const richTextQuery = `
content[]{
  ...,
  ${marksQuery},
  ${buttonPlugQuery},
  ${spacerPlugQuery},
  ${imageGalleryPlugQuery},
 
}
`;

export interface RichTextQueryResult {
  _type: "richText" | "block";
  _key: string;
  content: any[];
}

const link = (props: any) => {
  return <LinkMark {...props.mark}>{props.children}</LinkMark>;
};

const hand = (props: any) => {
  return <span className="font-hand">{props.children}</span>;
};

const handUnderline = (props: any) => {
  return (
    <Underline color={props?.mark?.color} on="init">
      {props.children}
    </Underline>
  );
};

const tag = (props: any) => {
  return <Typo variant={props.mark.tag}>{props.children}</Typo>;
};

const List: React.FC = (props: any) => {
  return (
    <ul
      className={`${
        props?.type === "number" ? "list-decimal" : "list-disc"
      } list-inside pb-4`}
    >
      {props.children}
    </ul>
  );
};

const styles = { h1: "h1", h2: "h2", h3: "h3", h4: "h4", normal: "body1" };

const BlockRenderer = (props: any) => {
  const { style = "normal" } = props.node;

  if (!props.children[0]) {
    return <Typo spacer />;
  }

  if (Object.keys(styles).includes(style)) {
    return (
      //@ts-ignore
      <Typo variant={styles[style]} as={"p"}>
        {props.children}
      </Typo>
    );
  }

  if (style === "blockquote") {
    return <blockquote>- {props.children}</blockquote>;
  }
  //@ts-ignore
  return BlockContent.defaultSerializers.types.block(props);
};
const Container: React.FC = ({ children }) => {
  return <>{children}</>;
};

const serializer: Serializers = {
  list: List,
  // hardBreak: () => <div className="border-2 border-red-600 "></div>,
  types: {
    imageGalleryPlug: ImageGalleryPlug,
    button: ButtonPlug,
    embed: EmbedPlug,
    block: BlockRenderer,
    spacer: SpacerPlug,
  },
  marks: {
    link,
    tag,
    hand,
    handUnderline,
  },
  container: Container,
};

const RichText: React.FC<any> = (props: any) => {
  // eslint-disable-next-line no-underscore-dangle
  const isBlock = props._type === "block";

  return (
    <BlockContent
      blocks={isBlock ? props : props.content}
      serializers={serializer}
    />
  );
};

export default RichText;
