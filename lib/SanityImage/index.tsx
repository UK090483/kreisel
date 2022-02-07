import React from "react";
import NextImage from "next/image";
import useSanityImage from "@lib/SanityImage/useSanityImage";

import { SanityImageComponent } from "./types";

const SanityImage: SanityImageComponent = (props) => {
  const { image, ...rest } = props;
  let imageProps = useSanityImage(image, rest);
  if (!imageProps) return null;

  return <NextImage {...imageProps} />;
};

export default SanityImage;
