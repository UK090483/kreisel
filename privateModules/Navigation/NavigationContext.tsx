import React, { useContext } from "react";
import DefaultNavigationItemBase from "./components/NavItem/NavigationItemBase";
import DefaultNavigationLink from "./components/NavItem/NavigationLink";
import { NavigationItemBaseComponent, NavigationLinkComponent } from "./types";

type NavigationState = {};

const initialState: NavigationState = {};

type NavigationContextValues<T> = {
  state: T;
  setState: (state: T) => void;
  NavItemBase: NavigationItemBaseComponent;
  NavItemLink: NavigationLinkComponent;
};

const NavigationContext = React.createContext<
  NavigationContextValues<NavigationState>
>({
  state: initialState,
  setState: () => {
    console.log("no Context.Provider Reachable");
  },
  NavItemBase: DefaultNavigationItemBase,
  NavItemLink: DefaultNavigationLink,
});

export const NavigationContextProvider: React.FC<
  Partial<NavigationContextValues<NavigationState>>
> = ({ children, NavItemLink, NavItemBase, ...rest }) => {
  const [state, setState] = React.useState<NavigationState>(initialState);

  return (
    <NavigationContext.Provider
      value={{
        state,
        setState,
        NavItemBase: NavItemBase || DefaultNavigationItemBase,
        NavItemLink: NavItemLink || DefaultNavigationLink,
        ...rest,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const { NavItemBase, NavItemLink } = useContext(NavigationContext);
  return { NavItemBase, NavItemLink };
};
