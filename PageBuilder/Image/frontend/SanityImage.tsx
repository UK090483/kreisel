"use client";

import { PureKreisel } from "components/Atoms/Kreisel";
import clsx from "clsx";
import Image, { ImageLoader, ImageProps } from "next/image";

import * as React from "react";
import type { ImageResult } from "PageBuilder/baseQueries";

export interface ISanityImageProps extends Omit<ImageProps, "src" | "alt"> {
  src?: ImageResult;
  alt?: string;
}

const loader: ImageLoader = (props) => {
  const { src, width, quality } = props;
  const res = `${src}&w=${width}${`&q=${quality ? quality : "75"}`}`;
  return res;
};

function SanityImage(props: ISanityImageProps) {
  const { alt, src, className, style, fill, ...rest } = props;

  if (!src || !src.url)
    return (
      <PureKreisel
        className={clsx({
          "absolute inset-0 h-full w-full object-center p-4 text-primary ":
            fill,
        })}
      />
    );

  const _alt = alt || src.alt || "alt";
  const _url = src.url + "?auto=format" || "";

  return (
    <Image
      priority
      style={{ ...style }}
      className={className}
      placeholder="blur"
      blurDataURL={src?.lqip}
      {...rest}
      alt={_alt}
      src={_url}
      loader={loader}
      {...handleWidthAndHeight(props, _url, style)}
    />
  );
}

export default SanityImage;

const handleWidthAndHeight = (
  props: ISanityImageProps,
  currentUrl: string,
  prevStyle: React.CSSProperties | undefined
) => {
  if (!props.src) return {};

  if (props.fill) {
    let res = {};
    const crop = getCrop(props.src, currentUrl);
    if (crop) {
      res = { src: crop.res.src };
    }

    if (props.src.hotspot) {
      const hotSpot = getHotSpot(props.src);
      if (hotSpot) {
        res = { ...res, style: { ...prevStyle, ...hotSpot.style } };
      }
    }
    return { ...res, fill: true };
  }

  if (props.src.crop) {
    const crop = getCrop(props.src, currentUrl);
    if (crop) {
      return crop.res;
    }
  }

  if (props.width && props.height) {
    return {
      width: props.width,
      height: props.height,
    };
  }
  if (props.width && !props.height) {
    return {
      width: props.width,
      height: parseInt(props.width + "") * props.src.aspectRatio,
    };
  }
  if (!props.width && props.height) {
    return {
      width: parseInt(props.height + "") / props.src.aspectRatio,
      height: props.height,
    };
  }
  return {
    width: props.src.width,
    height: props.src.height,
  };
};

const getCrop = (src: ImageResult, currentUrl: string) => {
  if (!src.crop) return null;
  const left = Math.round(src.crop.left * src.width);
  const top = Math.round(src.crop.top * src.height);
  const width = Math.round(src.width - src.crop.right * src.width - left);
  const height = Math.round(src.height - src.crop.bottom * src.height - top);
  const param = `&rect=${left},${top},${width},${height}&fit=clip`;
  const res = { width, height, src: currentUrl + param };
  return { left, top, width, height, param, res };
};

const getHotSpot = (src: ImageResult) => {
  if (!src.hotspot) return null;
  let x = src.hotspot.x;
  let y = src.hotspot.y;
  if (src.crop) {
    x = (src.hotspot.y - src.crop.top) / (1 - src.crop.top - src.crop.bottom);
    y = (src.hotspot.x - src.crop.left) / (1 - src.crop.left - src.crop.right);
  }
  return {
    style: {
      objectPosition: `${Math.round(y * 100)}% ${Math.round(x * 100)}%`,
    },
  };
};
