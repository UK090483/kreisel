"use client";
import Kreisel from "components/Atoms/Kreisel";
import supabase from "lib/supabase/client";
import Auth from "components/Organism/Auth/SupabaseAuth";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Session } from "@supabase/supabase-js";

const isServer = typeof window === "undefined";

interface IAuthContextState {
  email?: string;
  member: boolean;
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
}

const defaultState: IAuthContextState = {
  member: false,
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
};

const AuthContext = React.createContext(defaultState);

interface AuthContextProviderProps {
  children?: React.ReactNode;
}

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const { isLoading, status, user } = useUser();

  const { open, setClose, setOpen } = useAuthNav();
  const router = useRouter();

  const { push, query, asPath, replace } = router;

  const isDraftMode = false;
  const isMemberPage = asPath?.split("/")[1] === "mitgliederbereich";
  const isAuthenticated = status === "authenticated";
  const isUnauthenticated = status === "unauthenticated";
  const member = !!user?.user_metadata?.member;
  const email = user?.email || undefined;
  let showSpinner: boolean = false;

  const signIn = () => {
    setOpen();
  };

  const signOut = () => {
    supabase.auth.signOut();
  };

  if (isMemberPage && !isDraftMode) {
    showSpinner = status !== "authenticated";

    if (!member && isAuthenticated && !isServer) {
      showSpinner = true;
      push("/profile");
    }

    if (isUnauthenticated) {
      push("/");
    }
  }

  const { children, ...rest } = props;

  if (showSpinner) {
    return (
      <div
        data-test-id="spinner"
        className="flex h-screen w-full items-center justify-center px-28"
      >
        <Kreisel className="max-w-sm "></Kreisel>

        {open && <Auth close={setClose} />}
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ member, email, isAuthenticated, signIn, signOut, ...rest }}
    >
      {children}

      {open && <Auth close={setClose} />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const useUser = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    supabase.auth.onAuthStateChange((event, session) => {
      console.log({ event });

      if (event === "PASSWORD_RECOVERY") {
      } else {
        setSession(session);
      }
    });
  }, []);

  const user = session?.user;

  let status: "loading" | "authenticated" | "unauthenticated" = "loading";

  if (user) {
    status = "authenticated";
  }

  if (!user && !isLoading) {
    status = "unauthenticated";
  }

  return { user, isLoading, status };
};

const useAuthNav = () => {
  const router = useRouter();

  const open = !!router.query.___auth;

  const setOpen = () => {
    router.replace(
      {
        query: { ...router.query, ___auth: "show" },
      },
      undefined,
      { shallow: true }
    );
    //setOpen(true);
  };

  const setClose = () => {
    router.replace(
      {
        query: { ...router.query, ___auth: undefined },
      },
      undefined,
      { shallow: true }
    );
    //setOpen(true);
  };

  return { open, setOpen, setClose };
};
