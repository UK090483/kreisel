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
        log
        src={url}
        style={{ width: "1px", minWidth: "100%" }}
        height="1200"
      />
    </div>
  );
};

export default Embed;
