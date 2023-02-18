import Kreisel from "./Kreisel";
import { useSection } from "./Section/SectionContext";
import Tooltip from "./Tooltip";
import Typo from "./Typography/Typography";
import SanityImage from "PageBuilder/Image/frontend/SanityImage";
import { ImageResult } from "PageBuilder/Image/sanityImage.query";

import clsx from "clsx";
import * as React from "react";

interface IAvatarProps {
  showFull?: boolean;
  title?: string | null;
  subTitle?: string | null;
  image?: ImageResult | null;
  description?: string | null;
  id: string;
  size?: "s" | "m" | "l";
  children?: React.ReactNode;
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
          `relative    overflow-hidden shadow-2xl ${
            showFull
              ? "w-full border-[10px] border-transparent "
              : "rounded-full "
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
            src={image}
            fill
            className={clsx({
              "object-contain ": showFull,
              "object-cover ": !showFull,
            })}
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
          className={clsx("text-center uppercase ", {
            "text-black": _bg === "primary",
            "text-primary":
              ["white", "black", "secondary", "grey"].includes(_bg) || !_bg,
          })}
        >
          {title}
        </Typo>
      </div>
      <Typo space={false} className="mb-4 w-60 whitespace-pre-line text-center">
        {subTitle}
      </Typo>
      {children}

      {description && <Tooltip id={id}>{description}</Tooltip>}
    </div>
  );
};

export default Avatar;
