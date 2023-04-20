import Kreisel from "components/Kreisel";
import React, { useContext } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const isServer = typeof window === "undefined";

interface IAuthContextState {
  email?: string;
  member: boolean;
  isAuthenticated: boolean;
}

const defaultState: IAuthContextState = {
  member: false,
  isAuthenticated: false,
};

const AuthContext = React.createContext(defaultState);

interface AuthContextProviderProps {
  children?: React.ReactNode;
}

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const { data, status } = useSession();
  const { asPath, isPreview, push } = useRouter();
  const isMemberPage = asPath.split("/")[1] === "mitgliederbereich";
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const isUnauthenticated = status === "unauthenticated";
  //@ts-ignore
  const member = !!data?.member;
  const email = data?.user?.email || undefined;
  let showSpinner: boolean = false;

  if (isMemberPage && !isPreview) {
    showSpinner = status !== "authenticated";

    if (!member && isAuthenticated && !isServer) {
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
    <AuthContext.Provider value={{ member, email, isAuthenticated, ...rest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export { signIn, signOut };
