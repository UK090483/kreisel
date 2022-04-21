import SanityImage from "@lib/SanityImage";
import { imageMeta, ImageMetaResult } from "@lib/SanityImage/query";
import { PlugProps } from "@lib/SanityPageBuilder/lib/RichText";
import React from "react";

type ImagePlugProps = {
  image?: ImageMetaResult | null;
};

export const ImagePlugQuery = `
_type == "imagePlug" => {
  ...,
  'image': {${imageMeta}} 
}
`;

const ImagePlug: React.FC<PlugProps<ImagePlugProps>> = (props) => {
  const { node } = props;

  return (
    <>
      <div className="relative w-[400px] h-[400px] border border-red">
        <SanityImage image={node.image} layout="fill" objectFit="cover" />
      </div>
    </>
  );
};

export default ImagePlug;
