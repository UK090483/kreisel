import { ImageLoader } from "next/image";
const loader: ImageLoader = (props) => {
  const { src, width, quality } = props;
  const res = `${src}&w=${width}${`&q=${quality ? quality : "75"}`}`;
  return res;
};

export default loader;
