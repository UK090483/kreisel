import DefaultNavigationItemBase from "./components/NavItem/NavigationItemBase";
import DefaultNavigationLink from "./components/NavItem/NavigationLink";
import { NavigationItemBaseComponent, NavigationLinkComponent } from "./types";
import React, { useContext } from "react";

type NavigationState = {
  open: string | null;
};

const initialState: NavigationState = {
  open: null,
};

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
    // eslint-disable-next-line no-console
    console.log("no Context.Provider Reachable");
  },
  NavItemBase: DefaultNavigationItemBase,
  NavItemLink: DefaultNavigationLink,
});

export const NavigationContextProvider: React.FC<
  Partial<NavigationContextValues<NavigationState>> & {
    children?: React.ReactNode;
  }
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

export const useNavigationOpen = (id: string) => {
  const { state, setState } = useContext(NavigationContext);

  const setOpen = (open: string | null) => setState({ ...state, open });

  return { open: state.open === id, setOpen };
};
