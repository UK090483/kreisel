import { imageQuery } from "PageBuilder/Image/sanityImage.query";

export const ImagePlugQuery = `
_type == "imagePlug" => {
  ...,
  'image': image{${imageQuery}},
}
`;
