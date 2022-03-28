import { PlugProps } from "@lib/SanityPageBuilder/lib/RichText";
import * as React from "react";

interface IEmbedHTMLProps {
  html?: string | null;
}

const EmbedHTML: React.FC<PlugProps<IEmbedHTMLProps>> = (props) => {
  const { html } = props.node;

  console.log(props);

  if (!html) {
    return null;
  }
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default EmbedHTML;
