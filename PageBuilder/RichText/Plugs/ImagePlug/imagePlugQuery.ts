import { imageQuery, ImageResult } from "PageBuilder/baseQueries";

export type ImagePlugProps = {
  image?: ImageResult | null;
  customWidth?: "1/4" | "1/3" | "1/2" | "2/3" | "full";
  ratio?: "auto" | "3:2" | "5:9" | "16:9" | "1:1";
  position?: "left" | "right" | "center";
  float?: boolean;
  rounded?: boolean;
};
export const ImagePlugQuery = `
_type == "imagePlug" => {
  ...,
  'image': image{${imageQuery}},
}
`;
