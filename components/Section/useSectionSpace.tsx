import { BlockSpace } from "PageBuilder/schemaHelper/blockStyle";
import clsx from "clsx";

interface IIseSectionWidthProps extends BlockSpace {}

const useSectionSpace = (props: IIseSectionWidthProps) => {
  const { topSpace, bottomSpace } = props;
  const className = clsx({
    "pt-5 md:pt-10": topSpace === "s",
    "pt-16 md:pt-20": topSpace === "m" || topSpace === null,
    "pt-12 md:pt-32": topSpace === "l",
    "pt-16 md:pt-44": topSpace === "xl",
    "pt-24 md:pt-60": topSpace === "xxl",
    "pb-5 md:pb-10": bottomSpace === "s",
    "pb-16 md:pb-20": bottomSpace === "m" || bottomSpace === null,
    "pb-16 md:pb-32": bottomSpace === "l",
    "pb-12 md:pb-44": bottomSpace === "xl",
    "pb-24 md:pb-60": bottomSpace === "xxl",
    // "pb-0.5": !bottomSpace,
  });
  return className;
};

export default useSectionSpace;
