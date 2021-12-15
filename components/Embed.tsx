import React, { FC } from "react";

type EmbedProps = {
  url?: string;
};

const Embed: FC<EmbedProps> = (props) => {
  const { url } = props;
  return (
    <iframe className="mx-auto" src={url} width="640" height="1282">
      Wird geladen…
    </iframe>
  );
};

export default Embed;
