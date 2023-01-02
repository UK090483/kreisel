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
import { use } from "react";

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
          _id: `user.${uuidv4()}`,
          _type: "user",
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
    getUserByEmail: (email) => {
      _logger({ type: "info", message: `getUserByEmail`, args: { email } });

      return client
        .fetch<SanityAdapterUser>(getUserByEmailQuery, { email })
        .then((i) => (i ? toAdapterUser(i) : null));
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
      _logger({ type: "info", message: `updateUser` });
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

// const createVerificationToken: Adapter["createVerificationToken"] = async (
//   verificationToken
// ) => {
//   globToken = { ...verificationToken };
//   return globToken;
// };

// const useVerificationToken: Adapter["useVerificationToken"] = async (
//   params
// ) => {
//   const _token = { ...globToken } as VerificationToken;

//   // console.log("globToken:" + _token);

//   globToken = null;

//   return _token;
// };

// //@ts-ignore
// const getSessionAndUser: Adapter["getSessionAndUser"] = (sessionToken) => {
//   console.log("getSessionAndUser ----");
//   console.log(sessionToken);
//   console.log("getSessionAndUser ----");
//   return { user, session };
// };

// const deleteSession: Adapter["deleteSession"] = (sessionToken) => {
//   console.log("deleteSession ----");
//   console.log(sessionToken);
//   console.log("deleteSession ----");

//   const oldSess = { ...session } as AdapterSession;
//   session = null;

//   return new Promise<null | AdapterSession>((resolve, reject) => {
//     resolve(oldSess);
//   });
// };
