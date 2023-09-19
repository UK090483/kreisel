/* eslint-disable @next/next/no-img-element */

import FormControl from "./parts/FormControl";
import Button from "components/Atoms/Button/Button";
import React, { useCallback, useRef } from "react";

import { BsFillPersonFill } from "react-icons/bs";
import clsx from "clsx";
import { useController, useFormContext, FieldError } from "react-hook-form";

const size = 150;
// eslint-disable-next-line import/no-unused-modules

type UploadImage = {
  url?: string | null;
  file?: File;
  erased?: true;
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
        file: file,
      });
    }
  };

  const hasImage = !!value?.url;

  const handleRemove = useCallback(() => {
    onChange({
      url: null,
      erased: true,
    });
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
    <div className="flex items-end justify-between gap-4 ">
      <input
        data-test-id={`input_${name}`}
        className="hidden"
        accept="image/png, image/jpeg"
        ref={inputRef}
        type="file"
        onChange={handleSelectFile}
      />
      <button
        id={name}
        type="button"
        onClick={openSelection}
        className={clsx("w-fit rounded-full transition-transform", {
          "p-0": hasImage,
          "border-4 border-dashed border-primary-light p-6": !hasImage,
        })}
      >
        {!hasImage && (
          <BsFillPersonFill
            data-testid="imagePlaceholder"
            style={{ width: size - 50, height: size - 50 }}
            className="h-56 w-56 text-primary-light"
          />
        )}
        {hasImage && value.url && (
          <div className="image-item w-fit ">
            <div
              style={{ width: size, height: size }}
              className=" overflow-hidden rounded-full "
            >
              <img src={value.url} alt="" width={size} />
            </div>
          </div>
        )}
      </button>

      {!hasImage && (
        <Button aria-label="add Image" type="button" onClick={openSelection}>
          Add
        </Button>
      )}

      {hasImage && (
        <div className="flex w-full flex-wrap justify-end gap-2">
          <Button
            aria-label="update Image"
            type="button"
            onClick={openSelection}
          >
            Update
          </Button>
          <Button
            aria-label="remove Image"
            type="button"
            onClick={handleRemove}
          >
            Remove
          </Button>
        </div>
      )}
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
    trigger,
    formState: { errors, isSubmitting, isValid },
  } = useFormContext();

  const { field } = useController({ name });

  const fieldErrors = errors[name] as
    | Record<keyof UploadImage, FieldError>
    | undefined;

  const errorMessage = fieldErrors?.file.message;

  return (
    <FormControl
      disabled={isSubmitting}
      name={name}
      label={label}
      errorMessage={errorMessage}
    >
      <ImageUpload
        {...field}
        onChange={(i) => {
          if (i) {
            field.onChange(i);
            trigger(name);
          }
        }}
      />
    </FormControl>
  );
};
