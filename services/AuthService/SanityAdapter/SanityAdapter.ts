import type { SanityClient } from "@sanity/client";
import { omit } from "lodash";
import { v4 as uuidv4 } from "uuid";

import {
  Adapter,
  AdapterUser,
  VerificationToken,
  AdapterSession,
} from "next-auth/adapters";
import {
  getUserByEmailQuery,
  getUserByIdQuery,
  getUserByProviderAccountIdQuery,
} from "./queries";

let verificationTokens: { [identifier: string]: VerificationToken } = {};
let session: AdapterSession | null = null;

const user: AdapterUser = {
  emailVerified: new Date(2018, 1, 12, 10, 30),
  id: "user1",
  email: "web@konradullrich.com",
};

const defaultLogger = ({
  type,
  message,
  params,
}: {
  type: "error" | "info";
  message: string;
  params?: any;
}) => {
  console.log(`AUTH_LOGGER: ${message}`);
  if (params) {
    console.log({ ...params });
  }
};

interface SanityAdapterUser extends AdapterUser {
  _id: string;
}

type sanityAdapterProps = {
  client: SanityClient;
  devMode?: boolean;
  logger?: typeof defaultLogger;
  docType?: string;
  prefix?: string;
};

const toSanityUser = (user: AdapterUser) => {
  return { ...omit(user, "id"), _id: user.id } as SanityAdapterUser;
};

const toAdapterUser = (user: SanityAdapterUser): AdapterUser => {
  return { ...omit(user, "_id"), id: user._id } as AdapterUser;
};

const sanityAdapter = ({
  prefix = "user",
  docType = "user",
  client,
  logger,
  devMode = false,
}: sanityAdapterProps) => {
  const _logger = logger ? logger : devMode ? defaultLogger : () => {};
  const adapter: Adapter = {
    createUser: (user) => {
      _logger({ type: "info", message: `createUser` });
      return client
        .create({
          ...user,
          _id: `${prefix}.${uuidv4()}`,
          _type: docType,
        })
        .then((newUser) => {
          return { ...user, id: newUser._id } as AdapterUser;
        });
    },
    getUser: (id) => {
      _logger({ type: "info", message: `getUser` });
      return client
        .fetch<SanityAdapterUser>(getUserByIdQuery, { id, docType })
        .then((i) => (i ? toAdapterUser(i) : null));
    },
    getUserByEmail: async (email) => {
      _logger({ type: "info", message: `getUserByEmail`, params: { email } });
      const user = await client
        .fetch<SanityAdapterUser>(getUserByEmailQuery, { email, docType })
        .then((i) => (i ? toAdapterUser(i) : null));
      _logger({
        type: "info",
        message: `getUserByEmail-fetchUser`,
        params: { user },
      });
      return user;
    },

    getUserByAccount: ({ providerAccountId, provider }) => {
      _logger({ type: "info", message: `getUserByAccount` });
      return client
        .fetch<SanityAdapterUser>(getUserByProviderAccountIdQuery, {
          providerAccountId,
          provider,
        })
        .then((i) => (i ? toAdapterUser(i) : null));
    },
    updateUser: async (_user) => {
      _logger({ type: "info", message: `updateUser`, params: { _user } });
      return new Promise((resolve, reject) => {
        if (!_user?.id) return reject("id: missing in updateUser");
        client
          .patch(_user.id)
          .set({ ...omit(_user, "id") })
          .commit<AdapterUser>()
          .then((res) => {
            resolve(toAdapterUser(res));
          });
      });
    },
    deleteUser: () => {
      return null;
    },

    createSession: (_session) => {
      console.log("createSession ----");
      console.log(_session);
      console.log("createSession ----");

      const sess: AdapterSession = {
        ..._session,
        id: "what ever",
      };
      session = sess;
      return sess;
    },

    deleteSession: (sessionToken) => {
      return null;
    },
    updateSession: (session) => {
      return null;
    },
    unlinkAccount: () => {
      return undefined;
    },
    createVerificationToken: async (verificationToken) => {
      _logger({
        type: "info",
        message: `createVerificationToken`,
        params: verificationToken,
      });

      const createdVerificationToken = await client.create({
        _type: "verificationToken",
        ...verificationToken,
      });

      return createdVerificationToken;
    },
    useVerificationToken: async (params) => {
      const { identifier, token } = params;
      _logger({ type: "info", message: `useVerificationToken`, params });
      const deletedResult = (await client.delete(
        {
          query: `*[_type == 'verificationToken' && identifier == '${identifier}' && token == '${token}' ][0]`,
        },
        { returnFirst: true }
      )) as {
        documentId?: string;
        results: { document?: VerificationToken }[];
      };

      const hasDeleted = !!deletedResult.documentId;
      const deletedToken = deletedResult.results[0].document || null;

      if (!hasDeleted) {
        return null;
      }
      return deletedToken;
    },
    getSessionAndUser: (sessionToken) => {
      _logger({ type: "info", message: `getSessionAndUser` });
      return null;
    },
    linkAccount: (account) => {
      console.info("linkAccount");
      return null;
    },
  };

  return adapter;
};

export default sanityAdapter;
