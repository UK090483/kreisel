import type { SanityClient } from "@sanity/client/sanityClient";
import { parse, evaluate } from "groq-js";

type MockSanityClient = {
  fetchReturn?: any;
  database?: any[];
};

export const mockGetClient = ({ fetchReturn, database }: MockSanityClient) => {
  return () =>
    ({
      fetch: (query: string) => {
        if (database) {
          return fetchMock(database, query);
        }
        return Promise.resolve(fetchReturn);
      },
    } as unknown as SanityClient);
};

export const mockClient = ({ fetchReturn, database }: MockSanityClient) => {
  const created: { [k: string]: number } = {};

  const getId = (type: string) => {
    if (created[type]) {
      created[type] = created[type] + 1;
    } else {
      created[type] = 1;
    }
    return `${type}_${created[type]}`;
  };

  return {
    fetch: (query: string, params?: Record<string, unknown>) => {
      if (database) {
        return fetchMock(database, query, params);
      }

      return Promise.resolve(fetchReturn);
    },

    create: (doc: any) => {
      return Promise.resolve({ ...doc, _id: getId(doc._type) });
    },
    patch: (doc: string) => {
      return {
        set: (newData: any) => {
          return { commit: () => {
              database = database?.map((item)=> item._id === doc ? {...item,...newData}:{...item})

              return 
          } };
        },
      };
    },
  } as unknown as SanityClient;
};

const fetchMock = async (
  dataset: any,
  query: string,
  params?: Record<string, unknown>
) => {
  let tree = parse(query);
  let value = await evaluate(tree, { dataset, params });
  return await value.get();
};
