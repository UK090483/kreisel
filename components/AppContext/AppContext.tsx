import { useRouter } from "next/router";
import { PageData } from "pages/[[...slug]]";
import React, { useContext } from "react";
import { useSession } from "next-auth/react";

interface IAppContextState {
  data?: PageData | null;
  preview: boolean;
  hostName: string;
}

const defaultState: IAppContextState = {
  data: null,
  preview: false,
  hostName: "noHostname",
};

const AppContext = React.createContext(defaultState);

interface AppContextProviderProps {
  data: IAppContextState["data"];
  children?: React.ReactNode;
  preview?: boolean;
  hostName: string;
}

export const AppContextProvider = (props: AppContextProviderProps) => {
  const { children, ...rest } = props;

  return (
    <AppContext.Provider value={{ preview: false, ...rest }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export const useHomeRoute = () => {
  const { data } = useAppContext();
  const homeRoute = data?.homeRoute;
  const { locale: currentLocale, defaultLocale } = useRouter();

  const parseRoute = (href: string, locale?: string) => {
    const linkLocale = locale || currentLocale;
    const isDefaultLocale = linkLocale === defaultLocale;
    const homeLink =
      homeRoute && homeRoute[isDefaultLocale ? "slug" : `slug_${linkLocale}`];
    const isHomeLink = `/${homeLink}` === href;
    return isHomeLink ? "/" : href;
  };

  return { homeRoute, parseRoute };
};

export const useMemberPage = () => {
  const { data } = useContext(AppContext);
  const { data: sessionData } = useSession();
  const { push } = useRouter();
  const slug = data?.slug;
  if (!slug) return false;
  const isMemberPage = slug.split("/")[1] === "mitgliederbereich";
  if (!sessionData && isMemberPage) {
    typeof window !== "undefined" && push("/auth/login");
  }
  return isMemberPage;
};
