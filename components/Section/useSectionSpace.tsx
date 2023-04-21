import { BlockSpace } from "PageBuilder/schemaHelper/blockStyle";
import clsx from "clsx";

interface IIseSectionWidthProps extends BlockSpace {
  defaultSpace?: BlockSpace["topSpace"];
}

const useSectionSpace = (props: IIseSectionWidthProps) => {
  const { topSpace, bottomSpace, defaultSpace = "m" } = props;
  const _topSpace = topSpace || defaultSpace;
  const _bottomSpace = bottomSpace || defaultSpace;

  const className = clsx({
    "pt-5 md:pt-10": _topSpace === "s",
    "pt-16 md:pt-20": _topSpace === "m",
    "pt-12 md:pt-32": _topSpace === "l",
    "pt-16 md:pt-44": _topSpace === "xl",
    "pt-24 md:pt-60": _topSpace === "xxl",
    "pb-5 md:pb-10": _bottomSpace === "s",
    "pb-16 md:pb-20": _bottomSpace === "m",
    "pb-16 md:pb-32": _bottomSpace === "l",
    "pb-12 md:pb-44": _bottomSpace === "xl",
    "pb-24 md:pb-60": _bottomSpace === "xxl",
  });
  return className;
};

export default useSectionSpace;
