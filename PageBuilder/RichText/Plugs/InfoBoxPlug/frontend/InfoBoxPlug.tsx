import { ImageGalleryPlugResult } from "../InfoBoxPlug.query";
import Typo from "components/Typography/Typography";
import RichText from "PageBuilder/RichText/RichText";
import React from "react";

import clsx from "clsx";

const InfoboxPlug: React.FC<{ node: ImageGalleryPlugResult }> = (props) => {
  const { items, rows } = props.node;
  if (!items || items.length < 1) return <div>No Images</div>;

  return (
    <div
      className={clsx("grid  gap-4 ", {
        "grid-cols-1  lg:grid-cols-2 xl:grid-cols-4":
          rows === null || rows === 4,
        "grid-cols-1  lg:grid-cols-2": rows === 2,
        "grid-cols-1  lg:grid-cols-3": rows === 3,
      })}
    >
      {items.map((i, index) => {
        return (
          <div
            className={clsx("rounded-3xl", {
              "bg-secondary-light ": i.bgColor === "red",
              "bg-blue-200  ": i.bgColor === "blue",
              "bg-primary-light  ": i.bgColor === "yellow",
              "bg-green-200 ": i.bgColor === "green",
            })}
            key={i._key}
          >
            {i.rows?.map((row, index) => {
              return (
                <div
                  key={row._key}
                  className={clsx(
                    "p-4 break-words border-white first:border-0 border-t-4"
                  )}
                >
                  {index === 0 && <Typo bold> {i.title}</Typo>}
                  <RichText content={row.content} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default InfoboxPlug;
