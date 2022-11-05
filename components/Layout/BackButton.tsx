import Svg from "@components/Svg";
import { useRouter } from "next/router";
import * as React from "react";

export interface IBackButtonProps {}

export function BackButton(props: IBackButtonProps) {
  const { back } = useRouter();
  return (
    <button
      onClick={back}
      className=" fixed top-8 left-8 border-2 border-white rounded-full w-12 h-12 shadow-2xl bg-primary-light "
    >
      <Svg icon="chevronRight" className=" rotate-180 " />
    </button>
  );
}
