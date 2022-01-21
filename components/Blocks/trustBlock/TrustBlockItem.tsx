import { Image } from "@components/Image";
import Typo from "@components/Typography/Typography";
import {
  imageMeta,
  ImageMetaResult,
} from "privateModules/SanityPageBuilder/queries/snippets";
import * as React from "react";

export const trustBlockItemQuery = `
    ...,
   'image': image{${imageMeta}},
`;
interface ITrustBlockItemProps {}
export interface ITrustBlockItem {
  image?: ImageMetaResult | null;
  name: string;
  value: string;
  _key: string;
}

const TrustBlockItem: React.FunctionComponent<ITrustBlockItem> = (props) => {
  const { name, value, image } = props;
  return (
    <div className=" text-white ">
      <div className="relative w-full   aspect-w-1 aspect-h-1">
        <Image image={image} objectFit="contain" />
      </div>
      <Typo variant="h1" as="p" className=" text-center text-5xl pt-8 ">
        {value}
      </Typo>
      <Typo variant="h3" as="p" bold={false} className=" text-center ">
        {name}
      </Typo>
    </div>
  );
};

export default TrustBlockItem;
