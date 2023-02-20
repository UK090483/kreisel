import link from "./marks/Link/frontend/link";
import Download from "./marks/Download/frontend/download";

import ImageGalleryPlug from "./Plugs/ImageGaleriePlug/ImageGaleriePlug";
import SpacerPlug from "./Plugs/Spacer/frontend/Spacer";

import GSheet from "./Plugs/GSheet/frontend/Gsheet";
import ImagePlug from "./Plugs/ImagePlug/ImagePlug";

import EventPlug from "./Plugs/EventPlug/frontend/EventPlug";

import EmbedHTML from "./Plugs/EmbedHTML/EmbedHTML";
import HandUnderline from "./marks/HandUnderline/frontend/handUnderline";
import InfoboxPlug from "./Plugs/InfoBoxPlug/frontend/InfoBoxPlug";

import { List, ListItem } from "./list/List";
import Tooltip from "./marks/Tooltip/frontend/tooltip";

import StyleMark from "./marks/Style/frontend/Style";
import SanityRichText from "lib/SanityPageBuilder/lib/RichText";
import Typo from "components/Typography/Typography";
import React from "react";
import { PortableText } from "@portabletext/react";

const styles = { h1: "h1", h2: "h2", h3: "h3", h4: "h4", normal: "body" };

const RichText: React.FC<any> = (props: any) => {
  // return <PortableText value={props.content} components={{}} />;

  return (
    <SanityRichText
      //@ts-ignore
      list={List}
      // //@ts-ignore
      istItem={ListItem}
      content={props.content}
      plugs={{
        imageGalleryPlug: ImageGalleryPlug,
        spacer: SpacerPlug,
        gSheet: GSheet,
        imagePlug: ImagePlug,
        eventPlug: EventPlug,
        embedHTML: EmbedHTML,
        infoBox: InfoboxPlug,
      }}
      marks={{
        style: StyleMark,
        download: Download,
        tooltip: Tooltip,
        link,
        tag: (props: any) => {
          return (
            <Typo as="span" variant={props.mark.tag}>
              {props.children}
            </Typo>
          );
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
