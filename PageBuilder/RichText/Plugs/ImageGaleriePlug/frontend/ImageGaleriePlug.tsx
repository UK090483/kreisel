import { ImageGalleryPlugResult } from "../ImageGaleriePlug.query";
import { ImageGallery } from "components/index";
import React from "react";

const ImageGalleryPlug: React.FC<ImageGalleryPlugResult> = (props) => {
  return <ImageGallery {...props} />;
};

export default ImageGalleryPlug;
