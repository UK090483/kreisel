// /* eslint-disable @typescript-eslint/naming-convention */
// /* eslint-disable no-underscore-dangle */
// import React from "react";

// import classNames from "classnames";

// import Photo from "@components/Photo";
// import {
//   imageMeta,
//   ImageMetaResult,
// } from "@src/services/pageBuilder/queries/snippets";

// export const imagePlugQuery = `
// _type == "imagePlug" => {
//   ...,
//   _type,
//   _key,
//    customWidth,
//    customHeight,
//    ${imageMeta}
// }
// `;
// export interface ImagePlugResult extends ImageMetaResult {
//   _type: "imagePlug";
//   _key: string;
//   customWidth?: string | null;
//   customHeight?: string | null;
//   layout?: "fill" | "contain";
// }

// const ImagePlug: React.FC<ImagePlugResult> = (props) => {
//   const {
//     customWidth,
//     customHeight,

//     layout = "contain",
//     ...rest
//   } = props;

//   if (!rest.asset) return null;

//   const _layout = customHeight ? layout : "intrinsic";

//   return (
//     <div
//       className={classNames(
//         "relative",
//         { "w-full mx-auto": !customWidth },
//         { "mx-auto w-full": !!customWidth },
//         { "w-full xs:max-w-sm ": customWidth === "s" },
//         { "w-full xs:max-w-md": customWidth === "m" },
//         { "w-full xs:max-w-lg": customWidth === "l" },
//         { "w-full   xs:max-w-3xl": customWidth === "xl" },
//         { "w-full  xs:max-w-7xl": customWidth === "xxl" },
//         { "h-vh/5": customHeight === "s" },
//         { "h-vh/4": customHeight === "m" },
//         { "h-vh/3": customHeight === "l" },
//         { "h-vh/2": customHeight === "xl" },
//         { "h-vh": customHeight === "xxl" }
//       )}
//     >
//       <div>Image</div>
//       <Photo photo={rest} layout={_layout} />
//     </div>
//   );
// };

// export default ImagePlug;

export {};
