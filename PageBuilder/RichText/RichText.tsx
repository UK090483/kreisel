import link, { linkMarkQuery } from "./marks/link";
import Download from "./marks/Download/download";
import { downloadQuery } from "./marks/Download/download.query";

import ButtonPlug, { buttonPlugQuery } from "./Plugs/ButtonPlug/ButtonPlug";
import EmbedPlug from "./Plugs/EmbedPlug";
import ImageGalleryPlug from "./Plugs/ImageGaleriePlug/ImageGaleriePlug";
import SpacerPlug, { spacerPlugQuery } from "./Plugs/Spacer";

import GSheet, { GSheetPlugQuery } from "./Plugs/Gsheet";
import ImagePlug from "./Plugs/ImagePlug/ImagePlug";

import EventPlug, { EventPlugQuery } from "./Plugs/EventPlug/EventPlug";
import EmbedHTML from "./Plugs/EmbedHTML/EmbedHTML";
import HandUnderline from "./marks/handunderline";
import InfoboxPlug, { infoBoxPlugQuery } from "./Plugs/InfoBoxPlug/InfoBoxPlug";
import { ImagePlugQuery } from "./Plugs/ImagePlug/imagePlugQuery";
import { List, ListItem } from "./list/List";
import Tooltip from "./marks/Tooltip/tooltip";
import { toolTipQuery } from "./marks/Tooltip/tooltipQuery";
import { imageGalleryPlugQuery } from "./Plugs/ImageGaleriePlug/ImageGalerieQuery";
import SanityRichText from "lib/SanityPageBuilder/lib/RichText";
import Typo from "components/Typography/Typography";
import React from "react";

const marksQuery = `
markDefs[]{
  ...,
  ${linkMarkQuery},
  ${toolTipQuery},
  ${downloadQuery},
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

export const headerRichTextQuery = `
content[]{
  ...,
  ${marksQuery},
  ${ImagePlugQuery},
}
`;

const styles = { h1: "h1", h2: "h2", h3: "h3", h4: "h4", normal: "body" };

const RichText: React.FC<any> = (props: any) => {
  return (
    <SanityRichText
      //@ts-ignore
      list={List}
      //@ts-ignore
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
        download: Download,
        tooltip: Tooltip,
        link,
        tag: (props: any) => {
          return <Typo variant={props.mark.tag}>{props.children}</Typo>;
        },
        handUnderline: HandUnderline,
      }}
      blockRenderer={(props) => {
        const { style = "normal" } = props.node;

        if (props.children.every((i) => !i)) {
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
