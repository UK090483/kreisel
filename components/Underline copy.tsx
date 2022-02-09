// /* eslint-disable @next/next/no-img-element */
// import useHover from "@hooks/useHover";
// import useOnScreen from "@hooks/useOnSrceen";
// import clsx from "clsx";
// import React from "react";
// import { AppColor } from "types";

// interface UnderlineProps {
//   color?: AppColor;
//   on?: "hover" | "init" | "scroll";
//   type?: "under" | "around";
//   show?: boolean;
// }

// const L1 =
//   "M3 12C15.4225 7.92884 28.6277 8.1351 41.4004 8.1351C47.4568 8.1351 53.8237 7.56114 59.8119 8.77925C62.9064 9.4087 66.0464 8.83133 69.1542 9.24447C72.0722 9.63237 75.691 9.11126 78.451 10.3717C79.4227 10.8155 80.4128 10.6997 81.4387 10.7117C83.5749 10.7367 85.7003 11.0172 87.8388 11.0338C91.2255 11.0601 94.6131 11.0338 98 11.0338";

// const L2 =
//   "M4 11.914C4.60143 10.813 5.6262 9.98618 6.88667 9.29189C8.16843 8.58587 9.64068 7.70963 11.1063 7.24883C15.1133 5.98902 18.6565 9.88226 22.1181 10.6843C25.2512 11.4102 28.6607 12.2065 31.814 10.9771C33.1841 10.4429 34.3374 9.67064 35.6006 9.0121C36.9661 8.30023 38.682 7.93538 40.3042 7.74983C42.0984 7.5446 44.3517 7.58717 46.0775 8.03612C47.9448 8.52188 49.2228 9.72249 50.5264 10.8014C51.515 11.6196 51.9356 12.5189 53.5404 12.6037C55.2836 12.6958 57.0326 12.7639 58.7704 12.5842C60.7331 12.3812 62.6402 11.9761 64.6117 11.8034C67.7172 11.5314 71.0586 11.5912 74.1462 11.9856C76.5655 12.2946 78.9731 12.8306 81.4308 12.9421C82.5823 12.9943 83.8727 13.0615 85.0137 12.89C86.9581 12.5978 88.4132 11.6803 90.0059 10.8469C91.3846 10.1256 92.8479 9.49764 94.251 8.80389C94.5443 8.6589 94.7448 8.63472 95.0831 8.63472C95.4521 8.63472 96 8.50419 96 8.86896";

// const L3 =
//   "M7.54157 3.06993C27.7386 3.06993 48.1161 2.87791 68.263 3.13025C71.9239 3.1761 75.6259 3.26829 79.3004 3.27873C81.6995 3.28555 84.0369 3.2965 86.3618 3.38546C87.0236 3.41078 87.8629 3.40329 86.6798 3.45506C80.868 3.70941 75.2089 4.03563 69.3604 4.28332C61.5235 4.61523 54.1857 5.11829 46.6654 5.57559C39.4583 6.01386 31.8386 6.42001 24.9405 6.95371C19.1645 7.40059 13.524 7.97609 7.15987 8.24134C6.35706 8.2748 11.9332 7.9511 12.7532 7.92813C16.395 7.82613 16.9394 7.99812 20.6146 7.92813C29.4397 7.76009 38.1266 7.73974 47.0153 7.71469C59.0288 7.68082 70.7431 7.73535 82.2744 8.25294C87.0175 8.46584 91.7756 8.60788 95.9996 9";

// const Underline: React.FC<UnderlineProps> = ({
//   children,
//   color,
//   on = "init",
//   type = "under",
//   show = true,
// }) => {
//   const [isHovered, hoverProps] = useHover();

//   const [init, setInit] = React.useState(false);

//   const lineRef = React.useRef<string>("");
//   const lineLength = React.useRef<number>(0);

//   React.useEffect(() => {
//     lineRef.current = [L1, L2, L3][Math.floor(Math.random() * 3)];
//     lineLength.current = lineRef.current.length;
//     setInit(true);
//   }, []);

//   const { ref, isVisible } = useOnScreen({ delay: 200 });

//   const _on =
//     on === "init" ||
//     (on === "hover" && isHovered) ||
//     (on === "scroll" && isVisible);

//   if (!show) return <>{children}</>;

//   return (
//     <>
//       {init && (
//         <span ref={ref} {...hoverProps} className="relative inline-block ">
//           {children}
//           <svg
//             style={{ fill: "transparent", height: "20px" }}
//             preserveAspectRatio="none"
//             className="absolute  w-full transform scale-x-[1]  fill-current stroke-current -bottom-2 "
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 100 20"
//           >
//             <path
//               style={{
//                 strokeDasharray: lineLength.current,
//                 strokeDashoffset: _on ? 0 : lineLength.current,
//                 transition: `stroke-dashoffset 1s `,
//               }}
//               className={clsx("stroke-current", {
//                 "text-black": color === "black",
//                 "text-white": color === "white",
//                 "text-primary": color === "primary",
//                 "text-secondary": color === "secondary",
//               })}
//               d={lineRef.current}
//               strokeWidth="3.5"
//               strokeLinecap="round"
//             />
//           </svg>
//         </span>
//       )}
//     </>
//   );
// };

// export default Underline;
export {};
