import React, { FC } from "react";
import IframeResizer from "iframe-resizer-react";

type EmbedProps = {
  url?: string;
};

const Embed: FC<EmbedProps> = (props) => {
  const { url } = props;

  return (
    <div>
      <IframeResizer
        heightCalculationMethod="lowestElement"
        src={url}
        style={{ width: "1px", minWidth: "100%" }}
        height={600}
      />
    </div>
  );
};

export default Embed;
