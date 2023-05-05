"use client";
import { LinkMarkPros } from "../link.query";
import { Link } from "components/Link";

import Button from "components/Button/Button";
import { useSection } from "components/Section/SectionContext";
import React from "react";

import clsx from "clsx";

const LinkMark: React.FC<React.PropsWithChildren<LinkMarkPros>> = (props) => {
  const { bg } = useSection();

  const { link, asButton } = props;

  const dark = bg === "primary-light";

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
