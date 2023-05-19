"use client";

import React, { PropsWithChildren } from "react";

type StoreContextValues<T> = {
  state: T;
  setState: (state: T) => void;
};

function getStore<T>(initialState: T) {
  const StoreContext = React.createContext<StoreContextValues<T>>({
    state: initialState,
    setState: () => {
      // eslint-disable-next-line no-console
      console.log("no Context.Provider Reachable");
    },
  });

  const StoreContextProvider: React.FC<
    PropsWithChildren<Partial<StoreContextValues<T>>>
  > = ({ children, ...rest }) => {
    const [state, setState] = React.useState<T>(initialState);

    const value = { state, setState, ...rest };
    return (
      <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    );
  };
  const useStore = () => {
    const context = React.useContext(StoreContext);

    return context;
  };

  return { StoreContextProvider, useStore };
}

export default getStore;
