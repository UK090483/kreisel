import { imageQuery } from "PageBuilder/Image/sanityImage.query";

import type { ImageResult } from "PageBuilder/Image/sanityImage.query";

export type ImagePlugProps = {
  image?: ImageResult | null;
  customWidth?: "1/4" | "1/3" | "1/2" | "2/3" | "full";
  ratio?: "auto" | "3:2" | "5:9" | "16:9" | "1:1";
  position?: "left" | "right" | "center";
  float?: boolean;
};
export const ImagePlugQuery = `
_type == "imagePlug" => {
  ...,
  'image': image{${imageQuery}},
}
`;
