import {
  getUserByEmailQuery,
  getUserByIdQuery,
  getUserByProviderAccountIdQuery,
  memberType,
} from "./queries";
import { omit } from "lodash";
import { v4 as uuidv4 } from "uuid";

import {
  Adapter,
  AdapterUser,
  VerificationToken,
  AdapterSession,
  // eslint-disable-next-line import/no-unresolved
} from "next-auth/adapters";

import type { SanityClient } from "@sanity/client";

let globToken: VerificationToken | null = null;
let session: AdapterSession | null = null;

const user: AdapterUser = {
  emailVerified: new Date(2018, 1, 12, 10, 30),
  id: "user1",
  email: "web@konradullrich.com",
};

const defaultLogger = ({
  type,
  message,
  args,
}: {
  type: "error" | "info";
  message: string;
  args?: any;
}) => {
  console.log(`AUTH_LOGGER: ${message}`, args);
};

interface SanityAdapterUser extends AdapterUser {
  _id: string;
}

type sanityAdapterProps = {
  client: SanityClient;
  devMode?: boolean;
  logger?: typeof defaultLogger;
};

const toSanityUser = (user: AdapterUser) => {
  return { ...omit(user, "id"), _id: user.id } as SanityAdapterUser;
};

const toAdapterUser = (user: SanityAdapterUser): AdapterUser => {
  return { ...omit(user, "_id"), id: user._id } as AdapterUser;
};

const sanityAdapter = ({
  client,
  logger = defaultLogger,
  devMode = false,
}: sanityAdapterProps) => {
  const _logger = devMode ? logger : () => {};
  const adapter: Adapter = {
    createUser: (user) => {
      _logger({ type: "info", message: `createUser`, args: { user } });

      return client
        .create({
          ...user,
          _id: `${memberType}.${uuidv4()}`,
          _type: memberType,
          email: { current: user.email, _type: "slug" },
        })
        .then((newUser) => {
          return { ...user, id: newUser._id } as AdapterUser;
        });
    },
    getUser: (id) => {
      _logger({ type: "info", message: `getUser`, args: { id } });
      return client
        .fetch<SanityAdapterUser>(getUserByIdQuery, { id })
        .then((i) => (i ? toAdapterUser(i) : null));
    },
    getUserByEmail: async (email) => {
      _logger({
        type: "info",
        message: `getUserByEmail start`,
        args: { email },
      });

      const res = await client
        .fetch<SanityAdapterUser>(getUserByEmailQuery, { email })
        .then((i) => (i ? toAdapterUser(i) : null));

      _logger({
        type: "info",
        message: `getUserByEmail result`,
        args: { res },
      });
      return res;
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
      _logger({ type: "info", message: `updateUser start`, args: { _user } });
      if (!_user?.id) {
        console.error("id: missing in updateUser");
        return {} as AdapterUser;
      }
      const patchResult = await client
        .patch(_user.id)
        .set({ ...omit(_user, "id") })
        .commit<AdapterUser>({ returnDocuments: true });

      _logger({
        type: "info",
        message: `updateUser result`,
        args: { patchResult },
      });

      return {
        ...patchResult,
        //@ts-ignore
        email: patchResult?.email?.current,
      } as AdapterUser;
    },
    deleteUser: () => {
      _logger({ type: "info", message: `deleteUser` });
      return null;
    },

    createSession: (_session) => {
      console.log("createSession ----");
      console.log(_session);
      console.log("createSession ----");

      const sess: AdapterSession = {
        ..._session,
      };
      session = sess;
      return sess;
    },

    deleteSession: (sessionToken) => {
      _logger({ type: "info", message: `deleteSession` });
      return null;
    },
    updateSession: (session) => {
      _logger({ type: "info", message: `updateSession` });
      return null;
    },

    unlinkAccount: () => {
      _logger({ type: "info", message: `unlinkAccount` });
      return undefined;
    },
    createVerificationToken: (verificationToken) => {
      _logger({ type: "info", message: `createVerificationToken` });
      globToken = { ...verificationToken };
      return globToken;
    },
    useVerificationToken: () => {
      _logger({ type: "info", message: `useVerificationToken` });
      if (!globToken) return null;
      const useToken = { ...globToken };
      return useToken;
    },
    getSessionAndUser: (sessinToken) => {
      _logger({ type: "info", message: `getSessionAndUser` });
      return null;
    },
    linkAccount: (account) => {
      _logger({ type: "info", message: `linkAccount` });
      return null;
    },
  };

  return adapter;
};

export default sanityAdapter;
