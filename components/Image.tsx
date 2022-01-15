import React from "react";
import NextImage, { ImageLoader } from "next/image";
import { ImageMetaResult } from "@services/pageBuilderService/queries/snippets";
import useSanityImage from "@services/pageBuilderService/lib/useSanityImage";

interface ImageProps {
  src?: string;
  objectFit?: "cover" | "contain";
  image?: ImageMetaResult | null;
  alt?: string;
}

export const Image: React.FC<ImageProps> = (props) => {
  const { src, objectFit = "cover", image } = props;

  let imageProps = useSanityImage(image);

  if (src) {
    return <ImageFaker src={src} />;
  }

  if (!imageProps) return null;

  const { width, height, ...rest } = imageProps;

  return (
    <NextImage
      draggable={false}
      {...rest}
      layout="fill"
      objectFit={objectFit}
    />
  );
};

export const ImageFaker: React.FC<ImageProps> = ({ src }) => {
  const ranNum = (min: number = 4, max: number = 8) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const ranImage = src || `${ranNum()}00/${ranNum()}00`;

  return (
    <NextImage
      draggable={false}
      blurDataURL={`https://picsum.photos/50/50?blur=2`}
      src={`https://picsum.photos/${ranImage}`}
      alt={"bla"}
      layout="fill"
      objectFit="cover"
    />
  );
};
