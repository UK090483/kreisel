/* eslint-disable @next/next/no-img-element */
import { FormError } from "./parts/FormError";
import { FormLabel } from "./parts/FormLabel";
import { InputWarp } from "./parts/InputWrap";
import React, { useEffect } from "react";
import ImageUploading, {
  ImageUploadingPropsType,
  ImageType,
} from "react-images-uploading";
import { BsFillPersonFill } from "react-icons/bs";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

const size = 100;
// eslint-disable-next-line import/no-unused-modules

type ImageUploadProps = {
  onChange: (image?: ImageType) => void;
  value: ImageType;
};

const ImageUpload = (props: ImageUploadProps) => {
  const { value, onChange } = props;

  console.log(value);

  const handleChange: ImageUploadingPropsType["onChange"] = (
    imageList,
    addUpdateIndex
  ) => {
    onChange(imageList[0]);
  };

  return (
    <ImageUploading
      maxFileSize={100000}
      value={[value]}
      onChange={handleChange}
      dataURLKey="url"
    >
      {({
        errors,
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => {
        const hasImage = value;
        const image = value?.url;

        const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
          e.preventDefault();
          e.stopPropagation();
          onImageUpload();
        };

        return (
          <div className="">
            {!hasImage && (
              <button
                type="button"
                onClick={handleClick}
                className={clsx(
                  "border-dashed border-4 border-primary-light w-fit transition-transform p-6 rounded-full",
                  { "scale-110 ": isDragging }
                )}
                {...dragProps}
              >
                <BsFillPersonFill
                  style={{ width: size - 50, height: size - 50 }}
                  className="text-primary-light w-56 h-56"
                />
              </button>
            )}

            {image && (
              <div className="image-item w-fit">
                <div
                  style={{ width: size, height: size }}
                  className=" rounded-full overflow-hidden "
                >
                  <img src={image} alt="" width={size} />
                </div>

                <div className=" bg-primary-light grid grid-cols-2">
                  <button
                    className=" border-r-2 border-black"
                    onClick={() => onImageUpdate(0)}
                  >
                    Update
                  </button>
                  <button onClick={() => onImageRemove(0)}>Remove</button>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </ImageUploading>
  );
};

interface ImageUploadInputProps {
  name: string;
  label: string;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = (props) => {
  const { name, label } = props;

  const {
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const handleChange = (value?: ImageType) => {
    setValue(name, value);
    //field.onChange(value);
  };

  const value = watch(name);
  const all = watch();

  const error = errors[name];

  const errorMessage = error?.message as string | undefined;

  useEffect(() => {
    register(name);
  }, [register, name]);

  return (
    <InputWarp disabled={isSubmitting}>
      <FormLabel name={name} label={label} />
      <ImageUpload onChange={handleChange} value={value} />
      <FormError errorMessage={errorMessage} />
    </InputWarp>
  );
};
