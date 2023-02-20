import { Link } from "components/Link";
import { LinkResult, linkQuery } from "PageBuilder/Navigation/navigation.query";
import Button from "components/Button/Button";
import React from "react";

const InlineIcon = () => {
  return (
    <span className="inline-block   h-[1em] translate-y-[-0.2em] transform ">
      {/* <Icon icon="arrowRight" bgColor="grey" /> */} <span>LinkIcon</span>
    </span>
  );
};

type LinkMarkPros = {
  link?: LinkResult;
  asButton?: boolean;
};

export const linkMarkQuery = `
_type == "link" => {
  ...,
  'link': link{${linkQuery}},
    asButton,
  }`;

const LinkMark: React.FC<React.PropsWithChildren<LinkMarkPros>> = (props) => {
  const { link, asButton } = props;
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
          className="font-bold text-primary  underline"
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
