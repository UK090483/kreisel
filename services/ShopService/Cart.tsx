import { Image } from "@components/Image";
import useAnimationDelay from "@hooks/useAnimationDelay";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useShop } from "./shopContext";

const Cart: React.FC = () => {
  const s = useShop();
  const { article, cartOpen, setCartOpen, articleData, getArticleData } = s;

  const { render, dir, phase } = useAnimationDelay({
    delay: 1000,
    listener: cartOpen,
  });

  useEffect(() => {
    if (cartOpen) {
      getArticleData();
    }
  }, [cartOpen, getArticleData]);

  return render
    ? createPortal(
        <>
          <div
            className={`fixed inset-0 bg-black z-20 transition-colors bg-opacity-40 duration-500 ${
              dir === "in" && !["init", "start"].includes(phase)
                ? "bg-opacity-50"
                : "bg-opacity-0"
            }`}
          >
            <div
              className={`fixed top-0 bottom-0 right-0 w-full md:w-[300px] bg-primary shadow-2xl p-4 z-20 transition-transform duration-1000 ${
                dir === "in" && !["init", "start"].includes(phase)
                  ? "translate-x-0"
                  : "translate-x-full"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <div onClick={() => setCartOpen(false)}>Einkaufswagen</div>
                <ShopButton onClick={() => setCartOpen(false)}>X</ShopButton>
              </div>

              <div>
                {articleData.items &&
                  Object.keys(article).map((key) => {
                    const _articleData = articleData.items[key];
                    if (!_articleData) return null;
                    return (
                      <Article id={key} key={key} {..._articleData}></Article>
                    );
                  })}
              </div>
            </div>
          </div>
        </>,
        //@ts-ignore
        document.querySelector("#app-portal")
      )
    : null;
};

export default Cart;

type ArticleProps = {
  id: string;
  price?: number;
  title?: string;
};

const Article: React.FC<ArticleProps> = ({ children, id, price, title }) => {
  const s = useShop();
  const { removeArticle } = s;
  return (
    <div className=" bg-white  rounded-xl overflow-hidden mb-4">
      <div className="relative w-full aspect-w-16 aspect-h-10 ">
        <Image />
      </div>

      <div className="p-3">
        <div className=" font-bold">{title}</div>
        <div className=" text-right font-bold">{price} €</div>
        {children}
        <ShopButton onClick={() => removeArticle(id)}>entfernen</ShopButton>
      </div>
    </div>
  );
};

type ShopButtonProps = {
  onClick: () => void;
};
const ShopButton: React.FC<ShopButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className=" text-sm p-3 h-6 rounded-full flex justify-center items-center border-2 border-red text-red "
      onClick={onClick}
    >
      {children}
    </button>
  );
};
