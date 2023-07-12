import * as React from "react";

interface IEmbedHTMLProps {
  html?: string | null;
}

const EmbedHTML: React.FC<IEmbedHTMLProps> = (props) => {
  const { html } = props;
  if (!html) {
    return null;
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
export default EmbedHTML;
