import React from "react";
import { configuredSanityClient } from "@services/SanityService/sanity";
import { useNextSanityImage } from "next-sanity-image";
import { ImageLoader, ImageProps } from "next/image";
import { ImageMetaResult } from "../queries/snippets";

interface UseSanityImageOptions extends Pick<ImageProps, "objectFit"> {}

const Loader: ImageLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

const useSanityImage = (
  image?: ImageMetaResult | null,
  options?: UseSanityImageOptions
): ImageProps | null => {
  //@ts-ignore
  let imageProps: any = useNextSanityImage(configuredSanityClient, image);

  let fake = useFakeImage();

  if (!image) return fake;

  return imageProps;
};

export default useSanityImage;

const ranNum = (min: number = 4, max: number = 8) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const useFakeImage = () => {
  const ranImage = `${ranNum()}00/${ranNum()}00`;
  const [state] = React.useState<ImageProps>({
    blurDataURL: `https://picsum.photos/50/50?blur=2`,
    src: `https://picsum.photos/${ranImage}`,
    alt: "bla",
    layout: "fill",
  });
  return state;
};
