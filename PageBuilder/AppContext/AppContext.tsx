import React, { useContext } from "react";
import { PageData } from "PageBuilder/composedQueries";

interface IAppContextState {
  data?: PageData | null;
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

// export const useHomeRoute = () => {
//   const { data } = useAppContext();
//   const homeRoute = data?.homeRoute;

//   const currentLocale = "de";
//   const defaultLocale = "de";

//   const parseRoute = (href: string, locale?: string) => {
//     const linkLocale = locale || currentLocale;
//     const isDefaultLocale = linkLocale === defaultLocale;
//     const homeLink =
//       homeRoute && homeRoute[isDefaultLocale ? "slug" : `slug_${linkLocale}`];
//     const isHomeLink = `/${homeLink}` === href;
//     return isHomeLink ? "/" : href;
//   };
//   return { homeRoute, parseRoute };
// };
