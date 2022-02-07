import { ImageLoader, ImageProps } from "next/image";
import { ImageMetaResult } from "../query";

const loader: ImageLoader = (props) => {
  const { src, width, quality } = props;
  const res = `${src}&w=${width}${quality ? "&q=" + quality : ""}`;
  return res;
};

const getDefaultResult = (image: ImageMetaResult): ImageProps => {
  const url = `${image.url}?auto=format`;
  return {
    draggable: false,
    blurDataURL: image.lqip,
    src: url,
    loader,
    placeholder: "blur",
  };
};

export default getDefaultResult;
