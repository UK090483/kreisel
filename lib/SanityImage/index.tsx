import { SanityImageComponent } from "./types";
import useSanityImage from "lib/SanityImage/useSanityImage";
import React from "react";
import NextImage from "next/legacy/image";

const SanityImage: SanityImageComponent = (props) => {
  const { image, ...rest } = props;
  let imageProps = useSanityImage(image, rest);
  if (!imageProps) return null;

  return <NextImage {...imageProps} />;
};

export default SanityImage;
