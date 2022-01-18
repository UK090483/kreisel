import React from "react";

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
import SanityRichText from "privateModules/SanityPageBuilder/lib/RichText";

const marksQuery = `
markDefs[]{
  ...,
  ${linkMarkQuery},
}
`;
export const richTextQuery = `
content[]{
  ...,
  ${marksQuery},
  ${buttonPlugQuery},
  ${spacerPlugQuery},
  ${imageGalleryPlugQuery},
}
`;

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

const styles = { h1: "h1", h2: "h2", h3: "h3", h4: "h4", normal: "body" };

const RichText: React.FC<any> = (props: any) => {
  return (
    <SanityRichText
      list={List}
      content={props.content}
      plugs={{
        imageGalleryPlug: ImageGalleryPlug,
        button: ButtonPlug,
        embed: EmbedPlug,
        spacer: SpacerPlug,
      }}
      marks={{
        link,
        tag,
        hand,
        handUnderline,
      }}
      blockRenderer={(props) => {
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
      }}
    />
  );
};

export default RichText;
