import { imageMeta } from "@lib/SanityImage/query";

export const ImagePlugQuery = `
_type == "imagePlug" => {
  ...,
  'image': image{${imageMeta}},
}
`;
