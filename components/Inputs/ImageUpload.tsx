/* eslint-disable @next/next/no-img-element */
import { FormError } from "./parts/FormError";
import { FormLabel } from "./parts/FormLabel";
import { InputWarp } from "./parts/InputWrap";
import React, { useCallback, useRef } from "react";

import { BsFillPersonFill } from "react-icons/bs";
import clsx from "clsx";
import { useController, useFormContext } from "react-hook-form";

const size = 150;
// eslint-disable-next-line import/no-unused-modules

type UploadImage = {
  url?: string | null;
  file?: File;
};

type ImageUploadProps = {
  onChange: (image?: UploadImage | null) => void;
  value: UploadImage;
  name: string;
};

const ImageUpload = React.forwardRef(function ImageUpload(
  props: ImageUploadProps,
  ref
) {
  const { value, onChange, name } = props;

  const handleSelectFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.item(0);
    if (file) {
      onChange({
        url: URL.createObjectURL(file),
        file,
      });
    }
  };

  const hasImage = !!value?.url;

  const handleRemove = useCallback(() => {
    onChange(null);
  }, [onChange]);

  const inputRef = useRef<HTMLInputElement>(null);

  const openSelection: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (inputRef.current) {
        inputRef.current.click();
      }
    },
    [inputRef]
  );

  return (
    <div>
      <div className="flex">
        <input
          className="hidden"
          ref={inputRef}
          type="file"
          onChange={handleSelectFile}
        />

        <button
          id={name}
          type="button"
          onClick={openSelection}
          className={clsx("w-fit transition-transform rounded-full", {
            "p-0": hasImage,
            "p-6 border-dashed border-4 border-primary-light": !hasImage,
          })}
        >
          {!hasImage && (
            <BsFillPersonFill
              style={{ width: size - 50, height: size - 50 }}
              className="text-primary-light w-56 h-56"
            />
          )}
          {hasImage && value.url && (
            <div className="image-item w-fit">
              <div
                style={{ width: size, height: size }}
                className=" rounded-full overflow-hidden "
              >
                <img src={value.url} alt="" width={size} />
              </div>
            </div>
          )}
        </button>

        {hasImage && (
          <div className=" w-full grid grid-cols-2">
            <button
              aria-label="update Image"
              type="button"
              className=" border-r-2 border-black "
              onClick={openSelection}
            >
              Update
            </button>
            <button
              aria-label="remove Image"
              type="button"
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

interface ImageUploadInputProps {
  name: string;
  label: string;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = (props) => {
  const { name, label } = props;

  const {
    formState: { errors, isSubmitting },
  } = useFormContext();

  const { field } = useController({ name });

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <InputWarp disabled={isSubmitting}>
      <FormLabel name={name} label={label} />
      <ImageUpload {...field} />
      <FormError errorMessage={errorMessage} />
    </InputWarp>
  );
};
