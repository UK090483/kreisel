import { ImageMetaResult } from "../query";

const handleCrop = (image: ImageMetaResult) => {
  if (!image.crop) return null;
  const { crop } = image;
  const left = Math.round(crop.left * image.width);
  const top = Math.round(crop.top * image.height);
  const width = Math.round(image.width - crop.right * image.width - left);
  const height = Math.round(image.height - crop.bottom * image.height - top);

  return {
    dimensions: {
      left,
      top,
      width,
      height,
      aspectRatio: width / height,
    },
    query: `&rect=${left},${top},${width},${height}`,
  };
};

export default handleCrop;
