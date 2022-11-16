import SanityImage from "@lib/SanityImage";
import { ImageMetaResult } from "@lib/SanityImage/query";
import clsx from "clsx";
import * as React from "react";
import ReactTooltip from "react-tooltip";
import Kreisel, { PureKreisel } from "./Kreisel";
import { useSection } from "./Section/SectionContext";

import Typo from "./Typography/Typography";

interface IAvatarProps {
  showFull?: boolean;
  title?: string | null;
  subTitle?: string | null;
  image?: ImageMetaResult | null;
  description?: string | null;
  id: string;
  size?: "s" | "m" | "l";
}

const Avatar: React.FunctionComponent<IAvatarProps> = (props) => {
  const {
    showFull,
    title,
    image,
    subTitle,
    children,
    description,
    id,
    size = "m",
  } = props;
  const { bg } = useSection();
  const _bg = bg || "white";

  const hasImage = !!(image && image.url);

  return (
    <div data-tip data-for={id} className="flex flex-col items-center ">
      <div
        className={clsx(
          `relative    shadow-2xl overflow-hidden ${
            showFull
              ? "w-full border-[10px] border-transparent "
              : "rounded-full w-60"
          } `,
          {
            "h-60 w-60": size === "l",
            "h-44 w-44": size === "m",
            "h-12 w-12": size === "s",
          }
        )}
      >
        {hasImage && (
          <SanityImage
            image={image}
            objectFit={showFull ? "contain" : "cover"}
            sizes={"350px"}
          />
        )}
        {!hasImage && (
          <div className=" w-1/2 translate-x-1/2 translate-y-1/2 ">
            <Kreisel />
          </div>
        )}
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

      {description && (
        <ReactTooltip
          overridePosition={(position) => {
            console.log(position);

            const wWidth = window.innerWidth;
            const needFitLeft = position.left < 0;
            const needFitRight = position.left + 280 > wWidth;
            const needFitTop = position.top < 0;
            let p = { ...position };
            if (needFitLeft) {
              p = { ...p, left: 20 };
            }
            if (needFitRight) {
              p = { ...p, left: wWidth - 300 };
            }
            if (needFitTop) {
              p = { ...p, top: 20 };
            }
            return p;
          }}
          id={id}
          effect="float"
          // multiline={true}
          className="tooltip !max-w-xs"
        >
          {description}
        </ReactTooltip>
      )}
    </div>
  );
};

export default Avatar;
