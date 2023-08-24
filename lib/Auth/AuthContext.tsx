"use client";
import Kreisel from "components/Atoms/Kreisel";
import { supabase } from "lib/supabase/client";
import Auth from "components/Organism/Auth/SignIn";
import React, { useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

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
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const user = session?.user;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  let status = "loading";

  if (user) {
    status = "authenticated";
  }

  const isDraftMode = false;
  const { push } = useRouter();
  const pathname = usePathname();
  const isMemberPage = pathname?.split("/")[1] === "mitgliederbereich";

  const isAuthenticated = status === "authenticated";
  const isUnauthenticated = status === "unauthenticated";

  // const member = !!data?.member;
  const member = !!user?.user_metadata?.member;
  const email = user?.email || undefined;
  let showSpinner: boolean = false;

  const signIn = () => {
    setOpen(true);
    //push("/auth/loginSupabase");
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
      signIn();
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
      </div>
    );
  }

  //return <>{children}</>;

  return (
    <AuthContext.Provider
      value={{ member, email, isAuthenticated, signIn, signOut, ...rest }}
    >
      {children}

      {open && <Auth close={() => setOpen(false)} />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
