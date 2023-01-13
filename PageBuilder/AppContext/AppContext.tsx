import { useRouter } from "next/router";

import React, { useContext, useEffect, useState } from "react";

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
  const { data } = useContext(AppContext);
  const [verified, setVerified] = useState(false);
  const { member, status } = useAuth();

  const { isPreview } = useRouter();
  const slug = data?.slug;
  const isLoading = status === "loading";

  useEffect(() => {
    if (status !== "loading" && member) {
      setVerified(true);
    }
  }, [status, member]);

  if (!slug) return { isMemberPage: false, isLoading: false };

  const isMemberPage = slug.split("/")[1] === "mitgliederbereich";

  const showSpinner = !isPreview && isMemberPage && !verified;

  return { showSpinner };
};
