/* eslint-disable @next/next/no-img-element */
import useHover from "@hooks/useHover";
import clsx from "clsx";
import React from "react";
import { useIntersection } from "react-use";
import { AppColor } from "types";

interface UnderlineProps {
  color?: AppColor;
  on?: "hover" | "init" | "scroll";

  variant?: number;
  show?: boolean;
}

const L1 =
  "M3 12C15.4225 7.92884 28.6277 8.1351 41.4004 8.1351C47.4568 8.1351 53.8237 7.56114 59.8119 8.77925C62.9064 9.4087 66.0464 8.83133 69.1542 9.24447C72.0722 9.63237 75.691 9.11126 78.451 10.3717C79.4227 10.8155 80.4128 10.6997 81.4387 10.7117C83.5749 10.7367 85.7003 11.0172 87.8388 11.0338C91.2255 11.0601 94.6131 11.0338 98 11.0338";

const L2 =
  "M4 11.914C4.60143 10.813 5.6262 9.98618 6.88667 9.29189C8.16843 8.58587 9.64068 7.70963 11.1063 7.24883C15.1133 5.98902 18.6565 9.88226 22.1181 10.6843C25.2512 11.4102 28.6607 12.2065 31.814 10.9771C33.1841 10.4429 34.3374 9.67064 35.6006 9.0121C36.9661 8.30023 38.682 7.93538 40.3042 7.74983C42.0984 7.5446 44.3517 7.58717 46.0775 8.03612C47.9448 8.52188 49.2228 9.72249 50.5264 10.8014C51.515 11.6196 51.9356 12.5189 53.5404 12.6037C55.2836 12.6958 57.0326 12.7639 58.7704 12.5842C60.7331 12.3812 62.6402 11.9761 64.6117 11.8034C67.7172 11.5314 71.0586 11.5912 74.1462 11.9856C76.5655 12.2946 78.9731 12.8306 81.4308 12.9421C82.5823 12.9943 83.8727 13.0615 85.0137 12.89C86.9581 12.5978 88.4132 11.6803 90.0059 10.8469C91.3846 10.1256 92.8479 9.49764 94.251 8.80389C94.5443 8.6589 94.7448 8.63472 95.0831 8.63472C95.4521 8.63472 96 8.50419 96 8.86896";

const L3 =
  "M7.54157 3.06993C27.7386 3.06993 48.1161 2.87791 68.263 3.13025C71.9239 3.1761 75.6259 3.26829 79.3004 3.27873C81.6995 3.28555 84.0369 3.2965 86.3618 3.38546C87.0236 3.41078 87.8629 3.40329 86.6798 3.45506C80.868 3.70941 75.2089 4.03563 69.3604 4.28332C61.5235 4.61523 54.1857 5.11829 46.6654 5.57559C39.4583 6.01386 31.8386 6.42001 24.9405 6.95371C19.1645 7.40059 13.524 7.97609 7.15987 8.24134C6.35706 8.2748 11.9332 7.9511 12.7532 7.92813C16.395 7.82613 16.9394 7.99812 20.6146 7.92813C29.4397 7.76009 38.1266 7.73974 47.0153 7.71469C59.0288 7.68082 70.7431 7.73535 82.2744 8.25294C87.0175 8.46584 91.7756 8.60788 95.9996 9";

const K1 =
  "M34.2229 95.9997C24.6675 88.352 20.8509 85.4082 15.113 75.9247C3.54513 56.8052 7 30.5 21 21.5C30.5002 15.3928 40.3946 12.9997 52.9998 12.9997C62.9998 12.9997 76.9302 18.5929 86.4999 28.4998C97.9736 40.3779 100.5 70.9998 81.4999 82.2096C63.9063 92.5896 39.9998 93.9998 20.0751 82.2096C-3.17061 68.4543 -2.61993 32.819 18 18.4998C36 6 69.297 4.71453 87.9999 19.5228";

const K2 =
  "M44.0004 14.5C64.7631 20 76.3343 13.9696 86.2277 24.4846C106.001 45.5 94.2653 72.9145 80.3955 82.51C70.9836 89.0212 61.1812 91.5725 48.6932 91.5725C38.7861 91.5725 21.2183 85.1439 11.7376 74.5815C0.370617 61.9177 0.141721 30.6834 20.4582 17.784C37.8882 6.71724 59.5666 10.4208 74.7371 20.0816C97.5661 34.6195 97.1655 67.2438 76.7372 82.5103C58.9046 95.8371 34.2662 98.2982 15.7373 82.5103";

const lines = [
  { type: "line", path: L1, length: 97 },
  { type: "line", path: L2, length: 99 },
  { type: "line", path: L3, length: 250 },
  { type: "circle", path: K1, length: 435 },
  { type: "circle", path: K2, length: 446 },
];
const Underline: React.FC<UnderlineProps> = ({
  children,
  color,
  on = "init",
  show = true,
  variant,
}) => {
  const { isHovered, hoverProps } = useHover();

  const [init, setInit] = React.useState(false);

  const lineRef = React.useRef<number>(variant || 0);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "-100px",
    threshold: 1,
  });

  const isVisible = intersection?.isIntersecting;

  React.useEffect(() => {
    if (variant === undefined) {
      lineRef.current = Math.floor(Math.random() * lines.length);
    }
    setInit(true);
  }, []);

  const _on =
    on === "init" ||
    (on === "hover" && isHovered) ||
    (on === "scroll" && isVisible);

  const line = lines[lineRef.current];

  if (!show) return <>{children}</>;

  return (
    <>
      <span
        ref={intersectionRef}
        {...hoverProps}
        className="relative inline-block "
      >
        {init && (
          <svg
            style={{ fill: "transparent" }}
            preserveAspectRatio="none"
            className={clsx("absolute w-full fill-current stroke-current", {
              "   inset-0 scale-y-150 scale-x-125 -z-10  h-full ":
                line.type === "circle",
              " h-5 bottom-[-23px] translate-y-[-0.35em]": line.type === "line",
            })}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={line.type === "circle" ? "0 0 100 100" : "0 0 100 20"}
          >
            <path
              style={{
                strokeDasharray: line.length,
                strokeDashoffset: _on ? 0 : line.length,
                transition: `stroke-dashoffset 0.6s`,
              }}
              className={clsx("stroke-current", {
                "text-black": color === "black",
                "text-white": color === "white",
                "text-primary": color === "primary" || color === null,
                "text-primary-light": color === "primary-light",
                "text-secondary": color === "secondary",
                "text-secondary-light": color === "secondary-light",
                "text-grey": color === "grey",
                "text-grey-light": color === "grey-light",
              })}
              d={line.path}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        )}
        <span className=" relative">{children}</span>
      </span>
    </>
  );
};

export default Underline;
