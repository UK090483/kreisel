// "use client";

// import { ShopButton } from "./ShopButton";
// import { useShop } from "./shopContext";
// import SanityImage from "PageBuilder/Image/frontend/SanityImage";
// import useAnimationDelay from "hooks/useAnimationDelay";
// import { ImageResult } from "PageBuilder/baseQueries";
// import React, { useEffect, PropsWithChildren } from "react";
// import { createPortal } from "react-dom";
// import FocusTrap from "focus-trap-react";

// const Cart: React.FC = () => {
//   const s = useShop();
//   const { article, cartOpen, setCartOpen, articleData, getArticleData } = s;

//   const { render, dir, phase } = useAnimationDelay({
//     delay: 1000,
//     listener: cartOpen,
//   });

//   const sum = Object.values(articleData.items).reduce((acc, item) => {
//     if (item.price && typeof item.price === "number") {
//       return item.price + acc;
//     }

//     return acc;
//   }, 0);

//   useEffect(() => {
//     if (cartOpen) {
//       getArticleData();
//     }
//   }, [cartOpen, getArticleData]);

//   return render
//     ? createPortal(
//         <>
//           <FocusTrap>
//             <div
//               className={`fixed inset-0 bg-black z-20 transition-colors bg-opacity-40 duration-500 ${
//                 dir === "in" && !["init", "start"].includes(phase)
//                   ? "bg-opacity-50"
//                   : "bg-opacity-0"
//               }`}
//             >
//               <div
//                 className={`fixed top-0 bottom-0 right-0 w-full md:w-[300px] bg-primary shadow-2xl p-4 z-20 transition-transform duration-1000 ${
//                   dir === "in" && !["init", "start"].includes(phase)
//                     ? "translate-x-0"
//                     : "translate-x-full"
//                 }`}
//               >
//                 <div className="flex justify-between items-center mb-4">
//                   <div onClick={() => setCartOpen(false)}>Einkaufswagen</div>
//                   <ShopButton
//                     round
//                     color="accent"
//                     onClick={() => setCartOpen(false)}
//                   >
//                     x
//                   </ShopButton>
//                 </div>

//                 <div>
//                   {articleData.items &&
//                     Object.keys(article).map((key) => {
//                       const _articleData = articleData.items[key];
//                       if (!_articleData) return null;
//                       return (
//                         <Article id={key} key={key} {..._articleData}></Article>
//                       );
//                     })}
//                 </div>
//                 <div>
//                   summe : {sum} €
//                   <ShopButton onClick={() => setCartOpen(false)}>
//                     Bestellen
//                   </ShopButton>
//                 </div>
//               </div>
//             </div>
//           </FocusTrap>
//         </>,
//         //@ts-ignore
//         document.querySelector("#app-portal")
//       )
//     : null;
// };

// export default Cart;

// type ArticleProps = {
//   id: string;
//   price?: number;
//   title?: string;
//   image?: ImageResult;
// };

// const Article: React.FC<PropsWithChildren<ArticleProps>> = ({
//   children,
//   id,
//   price,
//   title,
//   image,
// }) => {
//   const s = useShop();
//   const { removeArticle } = s;
//   return (
//     <div className=" bg-white  rounded-xl overflow-hidden mb-4">
//       <div className="relative w-full aspect-w-16 aspect-h-10 ">
//         <SanityImage src={image} fill className=" object-cover" />
//       </div>

//       <div className="p-3">
//         <div className=" font-bold">{title}</div>
//         <div className=" text-right font-bold">{price} €</div>
//         {children}
//         <ShopButton color="accent" round onClick={() => removeArticle(id)}>
//           x
//         </ShopButton>
//       </div>
//     </div>
//   );
// };
