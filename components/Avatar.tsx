import SanityImage from "@lib/SanityImage";
import { ImageMetaResult } from "@lib/SanityImage/query";
import clsx from "clsx";
import * as React from "react";
import { useSection } from "./Section/SectionContext";

import Typo from "./Typography/Typography";

interface IAvatarProps {
  showFull?: boolean;
  title?: string | null;
  subTitle?: string | null;
  image?: ImageMetaResult | null;
}

const Avatar: React.FunctionComponent<IAvatarProps> = (props) => {
  const { showFull, title, image, subTitle, children } = props;

  const { bg } = useSection();

  const _bg = bg || "white";

  return (
    <div className="flex flex-col items-center ">
      <div
        className={`relative   h-60 shadow-2xl overflow-hidden ${
          showFull
            ? "w-full border-[10px] border-transparent "
            : "rounded-full w-60"
        } `}
      >
        <SanityImage
          image={image}
          objectFit={showFull ? "contain" : "cover"}
          sizes={"350px"}
        />
      </div>

      <div className="pt-3  ">
        <Typo
          bold
          variant="h5"
          as="h3"
          space={false}
          className={clsx("uppercase text-center ", {
            "text-black": _bg === "primary",
            "text-primary":
              ["white", "black", "secondary", "grey"].includes(_bg) || !_bg,
          })}
        >
          {title}
        </Typo>
      </div>
      <Typo space={false} className="whitespace-pre-line text-center w-60 mb-4">
        {subTitle}
      </Typo>
      {children}
    </div>
  );
};

export default Avatar;
