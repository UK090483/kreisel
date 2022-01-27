import { UseSanityImageOptions } from "../types";

export const checkDimensionOptions = (options: UseSanityImageOptions) => {
  if (options.width && !Number.isInteger(options.width)) {
    throw new Error("Sanity Image Option 'width' has to be of type Int");
  }
  if (options.height && !Number.isInteger(options.height)) {
    throw new Error("Sanity Image Option 'height' has to be of type Int");
  }

  return { width: options.width, height: options.height } as {
    width?: number;
    height?: number;
  };
};
