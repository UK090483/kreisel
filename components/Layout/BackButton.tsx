"use client";

import { IconButton } from "components/Button/Button";
import { useRouter } from "next/navigation";
import * as React from "react";

interface IBackButtonProps {}

export function BackButton(props: IBackButtonProps) {
  const { back } = useRouter();
  return (
    <IconButton
      onClick={back}
      icon="erase"
      className="fixed top-3 right-3 md:top-8 md:right-8"
    />
  );
}
