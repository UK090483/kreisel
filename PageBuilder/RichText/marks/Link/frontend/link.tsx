"use client";
import { LinkMarkPros } from "../link.query";
import Link from "components/Atoms/Link";

import Button from "components/Atoms/Button/Button";
import { useSection } from "components/Atoms/Section/SectionContext";
import React from "react";

import clsx from "clsx";

const LinkMark: React.FC<React.PropsWithChildren<LinkMarkPros>> = (props) => {
  const { bgColor } = useSection();

  const { link, asButton } = props;

  const dark = bgColor === "primary-light";

  if (asButton) {
    return (
      <Button href={link?.href} external={link?.external}>
        {props.children}
      </Button>
    );
  }

  return (
    <>
      {link?.href && (
        <Link
          href={link?.href}
          external={link?.external}
          className={clsx("font-bold underline underline-offset-4", {
            "text-font": dark,
            "text-primary": !dark,
          })}
        >
          {props.children}
        </Link>
      )}
    </>
  );
};

const LinkEx = (props: any) => {
  return <LinkMark {...props}>{props.children}</LinkMark>;
};

export default LinkEx;
export {};
