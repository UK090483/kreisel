import React from "react";
import link, { linkMarkQuery } from "./marks/link";
import hand from "./marks/hand";
import ButtonPlug, { buttonPlugQuery } from "./Plugs/ButtonPlug";
import EmbedPlug from "./Plugs/EmbedPlug";
import ImageGalleryPlug, {
  imageGalleryPlugQuery,
} from "./Plugs/ImageGaleriePlug/ImageGaleriePlug";
import Typo from "@components/Typography/Typography";
import SpacerPlug, { spacerPlugQuery } from "./Plugs/Spacer";
import Underline from "@components/Underline";
import SanityRichText from "@privateModules/SanityPageBuilder/lib/RichText";
import List from "./list/List";
import GSheet, { GSheetPlugQuery } from "./Plugs/Gsheet";
import ImagePlug, { ImagePlugQuery } from "./Plugs/ImagePlug";

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
  ${ImagePlugQuery},
  ${GSheetPlugQuery},
}
`;

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
        gSheet: GSheet,
        imagePlug: ImagePlug,
      }}
      marks={{
        link,
        tag: (props: any) => {
          return <Typo variant={props.mark.tag}>{props.children}</Typo>;
        },
        hand,
        handUnderline: (props: any) => {
          return (
            <Underline color={props?.mark?.color} on="init">
              {props.children}
            </Underline>
          );
        },
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
