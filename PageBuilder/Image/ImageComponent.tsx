// import createImageUrlBuilder from "@sanity/image-url";
import { ImageUrlFitMode } from "@sanity/types";
import React, { forwardRef } from "react";

// import {useClient} from '../../hooks'
// import {DEFAULT_STUDIO_CLIENT_OPTIONS} from '../../studioClient'

interface ImageCrop {
  _type: "sanity.imageCrop";
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface ImageHotspot {
  _type: "sanity.imageHotspot";
  x: number;
  y: number;
  height: number;
  width: number;
}

interface ImageSource {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
  crop?: ImageCrop;
  hotspot?: ImageHotspot;
}

interface ImageProps {
  dpr?: number;
  fit?: ImageUrlFitMode;
  source: ImageSource;
  height?: number;
  width?: number;
}

const Image = forwardRef(function Image(
  props: ImageProps &
    Omit<React.HTMLAttributes<HTMLImageElement>, "height" | "src" | "width">,
  ref: React.ForwardedRef<HTMLImageElement>
) {
  const { dpr, fit, height, source, width, ...restProps } = props;

  console.log(props);

  //   const client = useClient(DEFAULT_STUDIO_CLIENT_OPTIONS)
  // const imageUrlBuilder = useMemo(
  //   () => createImageUrlBuilder(client),
  //   [client]
  // );
  // const image = useMemo(
  //   () => imageUrlBuilder.image(source),
  //   [imageUrlBuilder, source]
  // );

  // const url = useMemo(() => {
  //   let b = image;

  //   if (dpr) b = b.dpr(dpr);
  //   if (fit) b = b.fit(fit);
  //   if (width) b = b.width(width);
  //   if (height) b = b.height(height);

  //   return b.url();
  // }, [dpr, fit, height, image, width]);

  return (
    <div>
      <h1>IMAGE</h1>
    </div>
  );

  // return <img {...restProps} ref={ref} src={url} />;
});

export default Image;
