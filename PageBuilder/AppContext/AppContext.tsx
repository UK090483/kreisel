import { useRouter } from "next/router";

import React, { useContext } from "react";

import useAuth from "lib/Auth/useAuth";
import { PageBuilderData } from "PageBuilder/query";

interface IAppContextState {
  data?: PageBuilderData | null;
}

const defaultState: IAppContextState = {
  data: null,
};

export const AppContext = React.createContext(defaultState);

export interface AppContextProviderProps {
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
  const res = { showSpinner: false };
  const { data } = useContext(AppContext);

  const { status } = useAuth();
  const { isPreview, push } = useRouter();
  const slug = data?.slug;
  const isMemberPage = slug
    ? slug.split("/")[1] === "mitgliederbereich"
    : false;

  if (isMemberPage && !isPreview) {
    res.showSpinner = status !== "authenticated";
    if (status === "unauthenticated") {
      push("/auth/login");
    }
  }

  if (isPreview) {
    res.showSpinner = false;
  }

  console.log(status);
  return res;
};
