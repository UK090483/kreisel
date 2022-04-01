import * as React from "react";
import { ImageMetaResult } from "@lib/SanityImage/query";
import Typo from "@components/Typography/Typography";

import { LinkResult } from "@lib/Navigation/query";
import clsx from "clsx";
import { AppColor } from "types";

import RichText from "../../RichText";
type ImageGalleryItemProps = {
  image?: ImageMetaResult;
  title?: string;
  link?: LinkResult;
  className?: string;
  contain?: boolean;
  content?: string | null;
  content2?: string | null;
  bgColor: AppColor;
};

const ImageGalleryItem: React.FunctionComponent<ImageGalleryItemProps> = (
  props
) => {
  const {
    image,
    title,
    link,
    className,
    contain = false,
    content,
    content2,
    bgColor,
  } = props;

  const color = clsx("p-4 h-1/2 rounded-theme", {
    "bg-white border-white": bgColor === "white",
    "bg-primary-light ": bgColor === "primary",
    "bg-primary-light": bgColor === "primary-light",
    "bg-secondary": bgColor === "secondary",
    "bg-secondary-light": bgColor === "secondary-light",
    "bg-grey": bgColor === "grey",
    "bg-grey-light": bgColor === "grey-light",
  });

  return (
    <>
      <div className={` flex flex-col  `}>
        <Typo bold>{title}</Typo>
        <div className={`${color}`}>
          <RichText content={content} />
        </div>

        <div className={` mt-2 ${color}`}>
          <RichText content={content2} />
        </div>
      </div>
    </>
  );
};

export default ImageGalleryItem;
