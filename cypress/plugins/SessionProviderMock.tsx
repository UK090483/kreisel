import { SessionContextValue, SessionContext } from "next-auth/react";

import React, { ReactNode } from "react";

export type MockSessionContextProps = {
  state?: SessionContextValue["status"];
  overwrite?: SessionContextValue;
};

export const getSessionContextValue = (props?: MockSessionContextProps) => {
  const states: { [K: string]: SessionContextValue } = {
    unauthenticated: {
      data: null,
      status: "unauthenticated",
    },
    loading: {
      data: null,
      status: "loading",
    },
    authenticated: {
      data: { expires: "", user: { email: "testEmail", name: "TestuserName" } },
      status: "authenticated",
    },
  };

  return {
    ...states[props?.state || "unauthenticated"],
    ...props?.overwrite,
  } as SessionContextValue;
};

type MockSessionContextProviderProps = {
  children: ReactNode;
  value: SessionContextValue;
};
export const MockSessionContextProvider = (
  props: MockSessionContextProviderProps
) => {
  const { children, value } = props;
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
