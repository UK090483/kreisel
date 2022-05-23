import React from "react";

import clsx from "clsx";

import Typo from "@components/Typography/Typography";
import RichText from "@components/RichText/RichText";

const infoBoxPlugItemQuery = `
_key,rows,title,bgColor,
`;
export const infoBoxPlugQuery = `
_type == "infoBox" => {
  _type,
  _key,
  'items':items[]{${infoBoxPlugItemQuery}},
}
`;

export interface ImageGalleryPlugItem {
  _type: "imageGalleryItem";
  title?: string;
  rows?: [{ _key: string; content?: any[] | null }];
  bgColor: "red" | "blue" | "yellow" | "green";
  _key: string;
}

export interface ImageGalleryPlugResult {
  _type: "imageGalleryPlug";
  name?: string;
  items: ImageGalleryPlugItem[];
}

const InfoboxPlug: React.FC<{ node: ImageGalleryPlugResult }> = (props) => {
  const { items } = props.node;

  console.log(props.node);

  if (!items || items.length < 1) return <div>No Images</div>;

  return (
    <div className="grid  grid-cols-1  lg:grid-cols-2 xl:grid-cols-4 gap-4 ">
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
                  className={clsx("p-4 border-white first:border-0 border-t-4")}
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
const columnsToRows = (items: ImageGalleryPlugItem[]) => {
  const rows = items.reduce((acc, item, index) => {
    const rows =
      item.rows?.map((i) => ({ content: i.content, itemKey: index })) || [];
    return [...acc, ...rows];
  }, [] as { content?: any; itemKey: number }[]);

  return rows;
};
