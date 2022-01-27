import SanityImage from "@privateModules/SanityImage";
import { imageMeta, ImageMetaResult } from "@privateModules/SanityImage/query";
import { PlugProps } from "@privateModules/SanityPageBuilder/lib/RichText";
import React from "react";

type ImagePlugProps = {
  image?: ImageMetaResult | null;
};

export const ImagePlugQuery = `
_type == "imagePlug" => {
  ...,
  'image': image{${imageMeta}} 
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
