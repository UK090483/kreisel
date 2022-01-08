import type { SanityClient } from "@sanity/client/sanityClient";
import { parse, evaluate } from "groq-js";
import { CLIENT_RENEG_LIMIT } from "tls";

type MockSanityClientProps = {
  fetchReturn?: any;
  database?: any[];
};

interface SanityMockClient extends SanityClient {
  getDb: () => any[];
}

export const mockClient = ({
  fetchReturn,
  database = [],
}: MockSanityClientProps) => {
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
    getDb: () => database,
    fetch: (query: string, params?: Record<string, unknown>) => {
      if (database) {
        return fetchMock(database, query, params).then((res) => {
          return res;
        });
      }
      return Promise.resolve(fetchReturn);
    },

    create: (doc: any) => {
      const newItem = { ...doc, _id: doc._id || getId(doc._type) };
      database = [...database, newItem];

      return Promise.resolve(newItem);
    },
    patch: (doc: string) => {
      return {
        set: (newData: any) => {
          return {
            commit: () => {
              const updateItem = database.find((i) => i._id === doc);
              database = database?.map((item) =>
                item._id === doc ? { ...item, ...newData } : { ...item }
              );

              return Promise.resolve({ ...updateItem, ...newData });
            },
          };
        },
      };
    },
  } as unknown as SanityMockClient;
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
