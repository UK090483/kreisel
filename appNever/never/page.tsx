/* eslint-disable import/no-unused-modules */
import fetchPageData from "./fetchPageData";
import Content from "PageBuilder/Content";

import React from "react";

type Props = {
  params: { slug?: string[] };
};

export const revalidate = 1;

const Page = async (props: Props) => {
  const slug = props.params?.slug
    ? props.params?.slug[props.params.slug.length - 1]
    : "home";

  const pageData = await fetchPageData(slug);

  return <Content content={pageData} />;
};

export default Page;
