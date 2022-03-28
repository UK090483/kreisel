import SanityImage from "@lib/SanityImage";
import React from "react";

interface Props {}

export const Video = (props: Props) => {
  return (
    <>
      <SanityImage />

      <div className="absolute inset-0 opacity-0">
        <iframe
          style={{ width: "100%", height: "100%" }}
          src="https://player.vimeo.com/video/457786425?loop=false&amp;autoplay=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;controles=false&amp;speed=true&amp;transparent=0&amp;gesture=media&amp;playsinline=true"
          allowFullScreen={false}
          allow="autoplay"
          title="Player for Was tut ihr gegen Kinderarbeit?"
          data-ready="true"
          tabIndex={-1}
        ></iframe>
      </div>
    </>
  );
};
