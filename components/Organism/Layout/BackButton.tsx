"use client";

import { IconButton } from "components/Atoms/Button/Button";
import { useRouter } from "next/navigation";
import * as React from "react";

interface IBackButtonProps {
  href?: string;
}

export function BackButton({ href }: IBackButtonProps) {
  const { back, push } = useRouter();

  const handleClick = () => {
    if (href) {
      push(href);
      return;
    }
    back();
  };

  return (
    <IconButton
      onClick={handleClick}
      icon="erase"
      className="fixed top-3 right-3 md:top-8 md:right-8"
    />
  );
}
