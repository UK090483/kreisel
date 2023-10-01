"use client";
import authRoutes from "./authRoutes";
import Kreisel from "components/Atoms/Kreisel";
import { User } from "@lib/Auth/IronSession/IronSession";
import { isBrowser } from "@lib/utils";
import React, { useCallback, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import useSWR from "swr";

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

//@ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const {
    data: user,
    mutate,
    isLoading,
  } = useSWR<User>("/api/auth/user", fetcher);

  const isDraftMode = false;
  const { push } = useRouter();
  const pathname = usePathname();
  const isMemberPage = pathname?.split("/")[1] === "mitgliederbereich";

  const isAuthenticated = !!user?.isLoggedIn;
  const isUnauthenticated = !user?.isLoggedIn;
  //@ts-ignore
  const member = !!user?.member;
  const email = user?.email || undefined;
  let showSpinner: boolean = false;

  const signIn = useCallback(() => {
    console.log("run sign in ");

    if (isBrowser) {
      push(`/${authRoutes.pages.signIn}`);
    }
  }, [push]);

  const signOut = useCallback(async () => {
    mutate(
      (await fetch(`/${authRoutes.api.logout}`, {
        method: "POST",
      })) as unknown as Promise<User>
    );
  }, [mutate]);

  if (isMemberPage && !isDraftMode) {
    showSpinner = isUnauthenticated;

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

  return (
    <AuthContext.Provider
      value={{ member, email, isAuthenticated, signIn, signOut, ...rest }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
