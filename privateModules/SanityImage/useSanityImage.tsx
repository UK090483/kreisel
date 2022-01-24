import { configuredSanityClient } from "@services/SanityService/sanity";
import { useNextSanityImage } from "next-sanity-image";
import { ImageLoader, ImageProps } from "next/image";
import { ImageMetaResult } from "@privateModules/SanityImage/query";
import { SanityImageProps } from "@privateModules/SanityImage";

interface UseSanityImageOptions extends Pick<SanityImageProps, "objectFit"> {}

const Loader: ImageLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

const useSanityImage = (
  image?: ImageMetaResult | null,
  options?: UseSanityImageOptions
): ImageProps | null => {
  //@ts-ignore
  let imageProps: any = useNextSanityImage(configuredSanityClient, image);

  //@ts-ignore
  if (!image) return getFakeImage();

  return imageProps;
};

export default useSanityImage;

const ranNum = (min: number = 4, max: number = 8) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const getFakeImage = () => {
  const ranImage = `${ranNum()}00/${ranNum()}00`;
  return {
    blurDataURL: `https://picsum.photos/50/50?blur=2`,
    src: `https://picsum.photos/${ranImage}`,
    alt: "bla",
    layout: "fill",
  };
};
