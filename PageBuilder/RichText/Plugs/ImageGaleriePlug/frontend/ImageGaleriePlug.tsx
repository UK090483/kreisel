import { ImageGalleryPlugResult } from "../ImageGaleriePlug.query";
import { ImageGallery } from "components";
import React from "react";

const ImageGalleryPlug: React.FC<ImageGalleryPlugResult> = (props) => {
  //@ts-ignore
  return <ImageGallery {...props} />;
};

export default ImageGalleryPlug;
