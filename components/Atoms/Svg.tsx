import clsx from "clsx";
import React from "react";

const paths = {
  hamburger: "M2 6h20M2 12h20M2 18h20",
  chevronRight: "M9 5l7 7-7 7",
  bell: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  identification:
    "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
  erase: "M6 18L18 6M6 6l12 12",
  pencil:
    "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
  profile:
    "M22.5 12C22.5 17.799 17.799 22.5 12 22.5V23.5C18.3513 23.5 23.5 18.3513 23.5 12H22.5ZM12 22.5C6.20101 22.5 1.5 17.799 1.5 12H0.5C0.5 18.3513 5.64872 23.5 12 23.5V22.5ZM1.5 12C1.5 6.20101 6.20101 1.5 12 1.5V0.5C5.64872 0.5 0.5 5.64872 0.5 12H1.5ZM12 1.5C17.799 1.5 22.5 6.20101 22.5 12H23.5C23.5 5.64872 18.3513 0.5 12 0.5V1.5ZM15.1667 10.3334C15.1667 12.2664 13.5996 13.8334 11.6667 13.8334V14.8334C14.1519 14.8334 16.1667 12.8187 16.1667 10.3334H15.1667ZM11.6667 13.8334C9.73365 13.8334 8.16665 12.2664 8.16665 10.3334H7.16665C7.16665 12.8187 9.18137 14.8334 11.6667 14.8334V13.8334ZM8.16665 10.3334C8.16665 8.40042 9.73365 6.83342 11.6667 6.83342V5.83342C9.18137 5.83342 7.16665 7.84814 7.16665 10.3334H8.16665ZM11.6667 6.83342C13.5996 6.83342 15.1667 8.40042 15.1667 10.3334H16.1667C16.1667 7.84814 14.1519 5.83342 11.6667 5.83342V6.83342ZM4.40873 19.5204C8.50924 15.4199 15.1575 15.4199 19.258 19.5204L19.9651 18.8133C15.4741 14.3222 8.19265 14.3222 3.70162 18.8133L4.40873 19.5204Z",
};

type Icon = keyof typeof paths;
interface PathProps extends React.SVGProps<SVGPathElement> {}

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  pathProps?: PathProps;
  icon: Icon;
  className?: string;
  size?: "s" | "m" | "l";
}

const Svg: React.FC<SvgProps> = ({
  icon,
  className,
  pathProps,
  size = "m",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={clsx(`inline-block stroke-current ${className}`, {
        "h-4 w-4 sm:h-6 sm:w-6": size === "m",
        "h-4 w-4": size === "s",
      })}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        {...pathProps}
        d={paths[icon]}
      />
      {/* {paths[icon]} */}
    </svg>
  );
};

export default Svg;
