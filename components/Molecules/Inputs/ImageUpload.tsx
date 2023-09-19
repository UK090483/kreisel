/* eslint-disable @next/next/no-img-element */

import Button from "components/Atoms/Button/Button";
import React, { useCallback, useRef, useState } from "react";

import { BsFillPersonFill } from "react-icons/bs";
import clsx from "clsx";

const size = 150;
// eslint-disable-next-line import/no-unused-modules

type ImageUploadState =
  | "empty"
  | "presenting"
  | "uploading"
  | "previewing"
  | "erasing";
type ImageUploadActions = "add" | "save" | "remove" | "abort";

type UploadImage = {
  url?: string | null;
  file?: File;
};

type ImageUploadProps = {
  onSave: (image?: UploadImage | null) => Promise<boolean>;
  onErase: () => Promise<boolean>;
  image?: string | null;
  name: string;
};

export const ImageUpload = (props: ImageUploadProps) => {
  const { image: externalImage, onSave, onErase, name } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [newImage, setImage] = useState<null | UploadImage>(null);

  const [state, setState] = useState<ImageUploadState>(() =>
    externalImage ? "presenting" : "empty"
  );

  const image =
    newImage || (!!externalImage ? { url: externalImage } : undefined);

  const hasImage = !!image && state !== "empty";

  const handleSelectFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.item(0);

    if (file) {
      const url = URL.createObjectURL(file);
      setState("previewing");
      setImage({ url: url, file: file });
    }
  };

  const handleSaveFile = () => {
    if (newImage) {
      setState("uploading");
      onSave(newImage).then((ok) => {
        setState("presenting");
      });
    }
  };

  const handleRemove = useCallback(() => {
    setState("erasing");
    onErase().then(() => {
      setState("empty");
    });
  }, [onErase]);

  const openSelection = useCallback(() => {
    if (inputRef.current) inputRef.current.click();
  }, [inputRef]);

  return (
    <div className="flex flex-col gap-4 w-fit ">
      <input
        data-test-id={`input_${name}`}
        className="hidden"
        accept="image/png, image/jpeg"
        ref={inputRef}
        type="file"
        onChange={handleSelectFile}
      />

      <div
        id={name}
        className={clsx("w-fit rounded-full transition-transform", {
          "p-0": hasImage,
          "border-4 border-dashed border-white p-6": !hasImage,
        })}
      >
        {state === "empty" && (
          <BsFillPersonFill
            color="white"
            data-testid="imagePlaceholder"
            style={{ width: size - 50, height: size - 50 }}
            className="h-56 w-56 "
          />
        )}
        {hasImage && image.url && (
          <div className="image-item w-fit ">
            <div
              style={{ width: size, height: size }}
              className="overflow-hidden relative rounded-full"
            >
              <img
                style={{ width: size, height: size }}
                src={image.url}
                alt=""
                width={size}
                height={size}
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col gap-3 justify-center ">
        <ImageUploadButtons
          state={state}
          onchange={(e) => {
            if (e === "add") {
              openSelection();
            }
            if (e === "abort") {
              setImage(null);
              setState(!!externalImage ? "presenting" : "empty");
            }

            if (e === "save") {
              handleSaveFile();
            }
            if (e === "remove") {
              handleRemove();
            }
          }}
        />
      </div>
    </div>
  );
};

interface ImageUploadInputProps {
  name: string;
  label: string;
}

const ImageUploadButtons = ({
  state,
  onchange,
}: {
  state: ImageUploadState;
  onchange: (e: ImageUploadActions) => void;
}) => {
  if (state === "empty") {
    return (
      <Button
        size="s"
        aria-label="upload Image"
        type="button"
        onClick={() => onchange("add")}
      >
        Bild Hochladen
      </Button>
    );
  }

  if (state === "presenting") {
    return (
      <>
        <Button
          size="s"
          aria-label="update Image"
          type="button"
          onClick={() => onchange("add")}
        >
          Bild Ändern
        </Button>
        <Button
          size="s"
          aria-label="update Image"
          type="button"
          onClick={() => onchange("remove")}
        >
          Bild Löschen
        </Button>
      </>
    );
  }

  if (state === "previewing") {
    return (
      <>
        <Button
          size="s"
          aria-label="update Image"
          type="button"
          onClick={() => onchange("save")}
        >
          Bild Speichern
        </Button>
        <Button
          size="s"
          aria-label="abort changing Image"
          type="button"
          onClick={() => onchange("abort")}
        >
          Abbrechen
        </Button>
      </>
    );
  }

  if (state === "uploading") {
  }

  return <></>;
};
