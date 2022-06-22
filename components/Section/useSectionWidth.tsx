import clsx from "clsx";
import { SectionProps } from "./Section";
interface IIseSectionWidthProps
  extends Pick<SectionProps, "width" | "noPadding"> {}
const useSectionWidth = (props: IIseSectionWidthProps) => {
  const { width, noPadding } = props;
  const className = clsx({
    "md:max-w-screen-md ": width === "s",
    "lg:max-w-screen-lg ": width === "m",
    "xl:max-w-screen-xl ": width === "l",
    "px-3": width !== "full" && !noPadding,
  });

  return className;
};

export default useSectionWidth;
