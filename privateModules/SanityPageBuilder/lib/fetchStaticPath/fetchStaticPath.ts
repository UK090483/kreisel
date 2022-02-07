import getSlugs, { getSlugsProps } from "./getSlugs";
import parseSlugs, { ParseSlugsProps } from "./parseSlugs";
type FetchStaticPathProps = {} & getSlugsProps &
  Omit<ParseSlugsProps, "getSlugResult">;
type FetchStaticPath = (props: FetchStaticPathProps) => any;

const fetchStaticPath: FetchStaticPath = async (props) => {
  const { client, doc, locales, query, fallback } = props;
  const getSlugResult = await getSlugs({ client, doc, locales, query });
  return parseSlugs({ getSlugResult, locales, fallback });
};

export default fetchStaticPath;
