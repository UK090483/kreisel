import React from "react";
import NextImage, { ImageProps as NextImagePros } from "next/image";
import useSanityImage from "@privateModules/SanityImage/useSanityImage";
import { ImageMetaResult } from "@privateModules/SanityImage/query";

export interface SanityImageProps {
  src?: string;
  objectFit?: NextImagePros["objectFit"];
  image?: ImageMetaResult | null;
  alt?: string;
}

const SanityImage: React.FC<SanityImageProps> = (props) => {
  const { src, objectFit = "cover", image } = props;

  let imageProps = useSanityImage(image);

  if (src) {
    return <SanityImageFaker src={src} />;
  }

  if (!imageProps) return null;

  const { width, height, ...rest } = imageProps;

  return (
    <NextImage
      draggable={false}
      {...rest}
      blurDataURL={image?.lqip}
      layout="fill"
      objectFit={objectFit}
      objectPosition=" center"
    />
  );
};

export default SanityImage;

export const SanityImageFaker: React.FC<SanityImageProps> = ({ src }) => {
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
