import React, { useCallback, useContext, PropsWithChildren } from "react";
import { useLocalStorage } from "react-use";

type ShopState = {
  cartOpen: boolean;
  articleData: {
    status: "init" | "loading" | "loaded" | "error";
    items: { [k: string]: any };
  };
};

const initialState: ShopState = {
  cartOpen: false,
  articleData: {
    status: "init",
    items: {},
  },
};

type StoreContextValues<T> = {
  state: T;
  setState: (state: T) => void;
  article: {
    [k: string]: { count: number };
  };
  articleData: ShopState["articleData"];
  addArticle: (id: string, count?: number) => void;
  getArticleData: () => Promise<any>;
  removeArticle: (id: string) => void;
};

const ShopContext = React.createContext<StoreContextValues<ShopState>>({
  state: initialState,
  setState: () => {
    // eslint-disable-next-line no-console
    console.log("no Context.Provider Reachable");
  },
  article: {},
  articleData: initialState.articleData,
  addArticle: () => null,
  removeArticle: () => null,
  getArticleData: () => Promise.resolve(),
});

export const ShopContextProvider: React.FC<
  PropsWithChildren<Partial<StoreContextValues<ShopState>>>
> = ({ children, ...rest }) => {
  const [state, setState] = React.useState<ShopState>(initialState);

  const [article, setArticles] = useLocalStorage<{
    [k: string]: { count: number };
  }>(`${prefix}.article`, {});

  const addArticle = (id: string, count: number = 1) => {
    const nextArticles = { ...article };
    nextArticles[id] = { count };
    setArticles(nextArticles);
    setState((oS) => ({ ...oS, cartOpen: true }));
  };

  const removeArticle = (id: string) => {
    const nextArticles = { ...article };
    delete nextArticles[id];
    setArticles(nextArticles);
  };

  const getArticleData = useCallback(async () => {
    setState((oS) => ({
      ...oS,
      articleData: {
        status: "loading",
        items: oS.articleData.items,
      },
    }));
    try {
      const data = await fetch("/api/shop/article", {
        method: "POST",
        body: JSON.stringify({ article: Object.keys({ ...article }) }),
      });
      const json = await data.json();
      setState((oS) => ({
        ...oS,
        articleData: {
          status: "loaded",
          items: json,
        },
      }));
      return json;
    } catch (error) {
      setState((oS) => ({
        ...oS,
        articleData: {
          status: "error",
          items: oS.articleData.items,
        },
      }));
      return null;
    }
  }, [article]);

  return (
    <ShopContext.Provider
      value={{
        state,
        setState,
        article: article || {},
        articleData: state.articleData,
        addArticle,
        removeArticle,
        getArticleData,
        ...rest,
      }}
    >
      {children}
      <div id="cart"></div>
    </ShopContext.Provider>
  );
};

const prefix = "shop";

export const useShop = () => {
  const {
    state,
    setState,
    article,
    addArticle,
    removeArticle,
    articleData,
    getArticleData,
  } = useContext(ShopContext);

  const { cartOpen } = state;

  const inCart = (id: string) => {
    return article && article[id];
  };

  const setCartOpen = (dir: boolean) => {
    setState({ ...state, cartOpen: dir });
  };

  return {
    article,
    addArticle,
    inCart,
    removeArticle,
    cartOpen,
    setCartOpen,
    articleData,
    getArticleData,
  };
};
