"use client";

import { IconButton } from "components/Atoms/Button/Button";
import { useRouter } from "next/navigation";
import * as React from "react";

interface IBackButtonProps {
  onclick?: () => void;
}

export function BackButton(props: IBackButtonProps) {
  const { back } = useRouter();
  const { onclick } = props;

  const handleClick = () => {
    if (onclick) {
      onclick();
    } else {
      back();
    }
  };
  return (
    <IconButton
      onClick={handleClick}
      icon="erase"
      className="fixed top-3 right-3 md:top-8 md:right-8"
    />
  );
}
