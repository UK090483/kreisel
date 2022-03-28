import type { SanityClient } from "@sanity/client/sanityClient";
import { parse, evaluate } from "groq-js";

type MockSanityClient = {
  fetchReturn?: any;
  database?: any;
};

export const mockClient = (props: MockSanityClient) => {
  const { fetchReturn, database } = props;
  return {
    fetch: (query: string) => {
      if (database) {
        return fetchMock(database, query);
      }

      return Promise.resolve(fetchReturn);
    },
  } as unknown as SanityClient;
};

export const mockGetClient = (props: MockSanityClient) => {
  return () => mockGetClient(props);
};

const fetchMock = async (dataset: any, query: string) => {
  let tree = parse(query);
  let value = await evaluate(tree, { dataset });
  return await value.get();
};
