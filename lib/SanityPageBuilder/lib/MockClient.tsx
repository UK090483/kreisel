import type { SanityClient } from "@sanity/client/sanityClient";
import { parse, evaluate } from "groq-js";

type MockSanityClient = {
  mockReturnValue?: any;
  database?: any;
};

export const mockClient = (props?: MockSanityClient) => {
  const { mockReturnValue, database } = props || {
    mockReturnValue: null,
    database: null,
  };

  return {
    fetch: (query: string) => {
      if (mockReturnValue) {
        return Promise.resolve(mockReturnValue);
      }

      return fetchMock(database, query);
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
