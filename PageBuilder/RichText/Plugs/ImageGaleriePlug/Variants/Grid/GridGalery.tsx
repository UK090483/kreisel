import ImageGalleryItem from "./GridGalerieItem";
import { ImageGalleryPlugResult } from "../../ImageGaleriePlug.query";
import clsx from "clsx";
import * as React from "react";

const GridGalerie: React.FunctionComponent<ImageGalleryPlugResult> = (
  props
) => {
  const { items, rows = 4, rows_mobile = 2, ratio = "1:1" } = props;
  return (
    <div
      className={clsx(
        "grid mx-auto max-w-sm md:max-w-full  grid-flow-row gap-2 pb-12 last:pb-0",
        {
          "grid-cols-1": rows_mobile === 1,
          "grid-cols-2": rows_mobile === 2,
          "grid-cols-3": rows_mobile === 3,
          "grid-cols-4": rows_mobile === 4,
          "grid-cols-5": rows_mobile === 5,
          "grid-cols-6": rows_mobile === 6,
          "grid-cols-7": rows_mobile === 7,
          "grid-cols-8": rows_mobile === 8,
          "md:grid-cols-1": rows === 1,
          "md:grid-cols-2": rows === 2,
          "md:grid-cols-3": rows === 3,
          "md:grid-cols-4": rows === 4,
          "md:grid-cols-5": rows === 5,
          "md:grid-cols-6": rows === 6,
          "md:grid-cols-7": rows === 7,
          "md:grid-cols-8": rows === 8,
        }
      )}
    >
      {items.map((item) => {
        const {
          image,
          title,
          _key,
          link,
          size = "m",
          contain,
          bgColor = "primary",
        } = item;
        return (
          <ImageGalleryItem
            contain={contain}
            image={image}
            title={title}
            key={_key}
            link={link}
            className={clsx({
              "aspect-w-10 aspect-h-10 ": ratio === "1:1",
              "aspect-w-16 aspect-h-9": ratio === "16:9",
              "aspect-w-3 aspect-h-2": ratio === "3:2",
              "aspect-w-2 aspect-h-3": ratio === "2:3",
              "md:col-span-2 md:row-span-2  ": size === "l",
              "bg-white": bgColor === "white",
              "bg-primary": bgColor === "primary",
              "bg-primary-light": bgColor === "primary-light",
              "bg-secondary": bgColor === "secondary",
              "bg-secondary-light": bgColor === "secondary-light",
              "bg-grey": bgColor === "grey",
              "bg-grey-light": bgColor === "grey-light",
            })}
          />
        );
      })}
    </div>
  );
};

export default GridGalerie;
