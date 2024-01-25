// "use client";
// import NavItem from "./NavItem";
// import React from "react";
// import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";

export interface INavItem {
  label?: string;
  items?: INavItem[];
  link?: {
    href?: string | null;
    external?: boolean;
  } | null;
  [key: string]: any;
}

// const NavigationMenu = ({ items }: { items: INavItem[] }) => {
//   const [left, setLeft] = React.useState(0);

//   if (!items || items.length === 0) return null;

//   return (
//     <RadixNavigationMenu.Root className="relative z-[1] flex w-full justify-center ">
//       <RadixNavigationMenu.List className="flex">
//         {items.map((i) => (
//           <NavItem key={i.link?.href} {...i} />
//         ))}
//       </RadixNavigationMenu.List>

//       {/* <RadixNavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
//         <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
//       </RadixNavigationMenu.Indicator> */}

//       {/* <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
//         <RadixNavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
//       </div> */}
//     </RadixNavigationMenu.Root>
//   );
// };

// export default NavigationMenu;
