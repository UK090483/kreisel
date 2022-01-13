import {
  fetchStaticPaths,
  FetchStaticPathsParams,
} from "@services/SanityService/fetchStaticPaths";
import {
  FetchStaticPropsResult,
  fetchStaticProps,
} from "@services/SanityService/fetchStaticProps";
import { sanityClient } from "@services/SanityService/sanity.server";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import ContentParser from "./ContentParser";

const PageComponent: NextPage<FetchStaticPropsResult> = ({ page }) => {
  return (
    <>
      <ContentParser content={page?.content} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return await fetchStaticPaths("page", sanityClient);
};

type GetStaticPropsPlus = GetStaticProps<
  { [key: string]: any },
  FetchStaticPathsParams
>;

export const getStaticProps: GetStaticPropsPlus = async ({ params }) => {
  return await fetchStaticProps({ params, sanityClient });
};

export default PageComponent;
