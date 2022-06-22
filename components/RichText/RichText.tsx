import React from "react";
import link, { linkMarkQuery } from "./marks/link";

import ButtonPlug, { buttonPlugQuery } from "./Plugs/ButtonPlug/ButtonPlug";
import EmbedPlug from "./Plugs/EmbedPlug";
import ImageGalleryPlug, {
  imageGalleryPlugQuery,
} from "./Plugs/ImageGaleriePlug/ImageGaleriePlug";
import Typo from "@components/Typography/Typography";
import SpacerPlug, { spacerPlugQuery } from "./Plugs/Spacer";

import SanityRichText from "@lib/SanityPageBuilder/lib/RichText";

import GSheet, { GSheetPlugQuery } from "./Plugs/Gsheet";
import ImagePlug from "./Plugs/ImagePlug/ImagePlug";

import EventPlug, { EventPlugQuery } from "./Plugs/EventPlug/EventPlug";
import EmbedHTML from "./Plugs/EmbedHTML/EmbedHTML";
import HandUnderline from "./marks/handunderline";
import InfoboxPlug, { infoBoxPlugQuery } from "./Plugs/InfoBoxPlug/InfoBoxPlug";
import { ImagePlugQuery } from "./Plugs/ImagePlug/imagePlugQuery";
import { List, ListItem } from "./list/List";

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
  ${EventPlugQuery},
  ${infoBoxPlugQuery},
}
`;

const styles = { h1: "h1", h2: "h2", h3: "h3", h4: "h4", normal: "body" };

const RichText: React.FC<any> = (props: any) => {
  return (
    <SanityRichText
      list={List}
      listItem={ListItem}
      content={props.content}
      plugs={{
        imageGalleryPlug: ImageGalleryPlug,
        button: ButtonPlug,
        embed: EmbedPlug,
        spacer: SpacerPlug,
        gSheet: GSheet,
        imagePlug: ImagePlug,
        eventPlug: EventPlug,
        embedHTML: EmbedHTML,
        infoBox: InfoboxPlug,
      }}
      marks={{
        link,
        tag: (props: any) => {
          return <Typo variant={props.mark.tag}>{props.children}</Typo>;
        },
        handUnderline: HandUnderline,
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
