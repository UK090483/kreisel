/* eslint-disable import/no-unused-modules */
import appConfig from "../app.config.json";
import { sanityClient as client } from "@services/SanityService/sanity.server";
import fetchStaticProps from "lib/SanityPageBuilder/lib/fetchStaticProps/fetchStaticProps";
import { fetchStaticPaths } from "lib/SanityPageBuilder/lib/fetchStaticPaths";

import { useAppContext } from "PageBuilder/AppContext/AppContext";
import { PageData, pageQuery } from "PageBuilder/composedQueries";
import Content from "PageBuilder/Content";
import { GetStaticPaths, GetStaticProps } from "next";

const locales = appConfig.locales;

const Page = () => {
  const { data } = useAppContext();
  //@ts-ignore
  return <Content content={data?.content || []} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return await fetchStaticPaths({
    client,
    doc: "page",
    locales,
  });
};

export const getStaticProps: GetStaticProps = async (props) => {
  const { params, preview, locale } = props;
  return await fetchStaticProps<PageData>({
    locale,
    revalidate: true,
    params,
    client,
    previewQuery: pageQuery,
    query: pageQuery,
    locales,
    preview,
  });
};

export default Page;
