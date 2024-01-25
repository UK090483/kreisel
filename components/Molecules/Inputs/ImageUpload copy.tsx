// /* eslint-disable @next/next/no-img-element */

// import Button from "components/Atoms/Button/Button";
// import React, { useCallback, useRef, useState } from "react";

// import { BsFillPersonFill } from "react-icons/bs";
// import clsx from "clsx";

// const size = 150;
// // eslint-disable-next-line import/no-unused-modules

// type UploadImage = {
//   url?: string | null;
//   file?: File;
//   erased?: true;
// };

// type ImageUploadProps = {
//   onSave: (image?: UploadImage | null) => void;
//   image?: string | null;
//   name: string;
// };

// export const ImageUpload = (props: ImageUploadProps) => {
//   const { image: externalImage, onSave, name } = props;

//   const inputRef = useRef<HTMLInputElement>(null);
//   const [newImage, setImage] = useState<null | UploadImage>(null);

//   const image = newImage || { url: externalImage };
//   const hasUploadableFile = !!newImage;
//   const hasImage = !!image;

//   const handleSelectFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
//     const file = e.target.files?.item(0);
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setImage({ url: url, file: file });
//     }
//   };

//   const handleSaveFile = () => {
//     onSave(newImage);
//   };

//   const handleRemove = useCallback(() => {
//     setImage((i) => ({ ...i, erased: true }));
//   }, []);

//   const openSelection: React.MouseEventHandler<HTMLButtonElement> = useCallback(
//     (e) => {
//       e.preventDefault();
//       e.stopPropagation();

//       if (inputRef.current) {
//         inputRef.current.click();
//       }
//     },
//     [inputRef]
//   );

//   return (
//     <div className=" flex flex-col gap-4 w-fit">
//       <input
//         data-test-id={`input_${name}`}
//         className="hidden"
//         accept="image/png, image/jpeg"
//         ref={inputRef}
//         type="file"
//         onChange={handleSelectFile}
//       />

//       <div
//         id={name}
//         className={clsx("w-fit rounded-full transition-transform", {
//           "p-0": hasImage,
//           "border-4 border-dashed border-white p-6": !hasImage,
//         })}
//       >
//         {!hasImage && (
//           <BsFillPersonFill
//             color="white"
//             data-testid="imagePlaceholder"
//             style={{ width: size - 50, height: size - 50 }}
//             className="h-56 w-56 "
//           />
//         )}
//         {hasImage && image.url && (
//           <div className="image-item w-fit ">
//             <div
//               style={{ width: size, height: size }}
//               className="overflow-hidden relative rounded-full"
//             >
//               <img
//                 style={{ width: size, height: size }}
//                 src={image.url}
//                 alt=""
//                 width={size}
//                 height={size}
//                 className="object-cover"
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="w-fit">
//         {!hasImage && (
//           <Button
//             size="s"
//             aria-label="add Image"
//             type="button"
//             onClick={openSelection}
//           >
//             Profilbild hochladen
//           </Button>
//         )}
//         {hasImage && (
//           <div className="flex gap-2">
//             {hasUploadableFile && (
//               <Button
//                 size="s"
//                 aria-label="Save Image"
//                 type="button"
//                 onClick={handleSaveFile}
//               >
//                 Save
//               </Button>
//             )}
//             <Button
//               size="s"
//               aria-label="update Image"
//               type="button"
//               onClick={openSelection}
//             >
//               Update
//             </Button>

//             {!hasUploadableFile && (
//               <Button
//                 size="s"
//                 aria-label="remove Image"
//                 type="button"
//                 onClick={handleRemove}
//               >
//                 Remove
//               </Button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// interface ImageUploadInputProps {
//   name: string;
//   label: string;
// }
