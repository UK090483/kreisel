import React from "react";

import Link from "next/link";

import {
  linkQuery,
  LinkResult,
} from "@services/pageBuilderService/queries/snippets";

// import Icon from "@components/Icon";
// import { buildInternalLink } from "@src/services/pageBuilder/buildInternalLink";

const InlineIcon = () => {
  return (
    <span className="inline-block   h-[1em] transform translate-y-[-0.2em] ">
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
  'test':'test',
    'internalLink': link.internalLink->{'type':_type, 'slug':slug.current},
    
    asButton,
  }`;

const LinkMark: React.FC<LinkMarkPros> = (props) => {
  const { link, asButton } = props;

  if (!link?.external && link?.internalLink) {
    return (
      <Link href={link?.internalLink} passHref>
        <a className="underline text-frida-red">
          {asButton ? <InlineIcon /> : props.children}
        </a>
      </Link>
    );
  }

  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={link?.href || "/"}
      className="underline text-frida-red"
    >
      {asButton ? <InlineIcon /> : props.children}
    </a>
  );
};

export default LinkMark;

export {};
