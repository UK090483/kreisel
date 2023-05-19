"use client";

import getStore from "./getStore";

const initialState: StoreState = {
  menuOpen: false,
};
type StoreState = {
  menuOpen: boolean;
};

const { StoreContextProvider, useStore } = getStore<StoreState>(initialState);

export { useStore };
export default StoreContextProvider;
