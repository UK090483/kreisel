import BodyParser from "./lib/BodyParser";
import BlockFactory from "./lib/BlockFactory";
import { SPBOptions, SPBResult } from "./types";
import { fetchStaticProps } from "./lib/fetchStaticProps";
import { fetchStaticPaths } from "./lib/fetchStaticPaths";

function SPB<P extends { [k: string]: any } = {}>({
  components,
  client,
  locales,
  query,
}: SPBOptions): SPBResult<P> {
  const bf = BlockFactory;
  bf.registerComponents(components);

  return {
    blockFactory: bf,
    PageComponent: (props) => {
      const { data, page, query } = props;

      console.log(props);

      return <BodyParser blockFactory={bf} content={data.content || []} />;
    },
    getStaticPaths: async () => {
      return await fetchStaticPaths({ client, doc: "page", config: locales });
    },
    //@ts-ignore
    getStaticProps: async ({ params }) => {
      return await fetchStaticProps({
        params,
        client,
        query: `${bf.getRootQuery()}, ${query || ""}`,
        locales,
      });
    },
  };
}

export default SPB;
