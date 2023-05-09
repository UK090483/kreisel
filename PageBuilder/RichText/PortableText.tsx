import { List, ListItem } from "./list/List";
import HandUnderline from "./marks/HandUnderline/frontend/handUnderline";
import ImagePlug from "./Plugs/ImagePlug/ImagePlug";
import ImageGalleryPlug from "./Plugs/ImageGaleriePlug/ImageGaleriePlug";
import InfoboxPlug from "./Plugs/InfoBoxPlug/frontend/InfoBoxPlug";
import EventPlug from "./Plugs/EventPlug/frontend/appDirect/EventPlug";
import EmbedHTML from "./Plugs/EmbedHTML/EmbedHTML";
import SpacerPlug from "./Plugs/Spacer/frontend/Spacer";
import Tooltip from "./marks/Tooltip/frontend/tooltip";
import Download from "./marks/Download/frontend/download";
import Link from "./marks/Link/frontend/link";
import StyleMark from "./marks/Style/frontend/Style";
import Typo from "components/Typography/Typography";
import {
  PortableText,
  PortableTextReactComponents,
  PortableTextBlockComponent,
} from "@portabletext/react";
import React, { ComponentProps } from "react";

const styles: { [k: string]: ComponentProps<typeof Typo>["variant"] } = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  normal: "body",
};

const Type: PortableTextBlockComponent = (props) => {
  const variant = props.value.style
    ? styles[props.value.style] || "body"
    : "body";

  return <Typo variant={variant}>{props.children}</Typo>;
};

const components: Partial<PortableTextReactComponents> = {
  block: {
    h1: Type,
    h2: Type,
    h3: Type,
    h4: Type,
    normal: Type,
  },
  list: {
    bullet: List,
    number: List,
  },
  listItem: ListItem,

  marks: {
    handUnderline: ({ value, children }) => {
      return <HandUnderline {...value}>{children}</HandUnderline>;
    },
    tooltip: ({ value, children }) => {
      return <Tooltip {...value}>{children}</Tooltip>;
    },
    download: ({ value, children }) => {
      return <Download {...value}>{children}</Download>;
    },
    link: ({ value, children }) => {
      return <Link {...value}>{children}</Link>;
    },
    style: ({ value, children }) => {
      return <StyleMark {...value}>{children}</StyleMark>;
    },
  },

  types: {
    imagePlug: ({ value }) => {
      return <ImagePlug {...value} />;
    },
    imageGalleryPlug: ({ value }) => {
      return <ImageGalleryPlug {...value} />;
    },

    infoBox: ({ value }) => {
      return <InfoboxPlug {...value} />;
    },
    eventPlug: ({ value }) => {
      return <EventPlug {...value} />;
    },

    embedHTML: ({ value }) => {
      return <EmbedHTML {...value} />;
    },
    spacer: ({ value }) => {
      return <SpacerPlug {...value} />;
    },
  },
};

const Portable: React.FC<any> = (props: any) => {
  return <PortableText value={props.content} components={components} />;
};

export default Portable;
