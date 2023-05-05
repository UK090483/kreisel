// "use client";
// import React from "react";
// import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
// import classNames from "classnames";
// import { CaretDownIcon } from "@radix-ui/react-icons";
// import Link from "next/link";

// interface NavItem {
//   label?: string;
//   items?: NavItem[];
//   link?: {
//     href?: string | null;
//     external?: boolean;
//   } | null;
//   [key: string]: any;
// }

// const NavigationMenu = ({ items }: { items: NavItem }) => {
//   return (
//     <RadixNavigationMenu.Root className="relative z-[1] flex w-full justify-center border-2 border-red">
//       <RadixNavigationMenu.List className="center m-0 flex ">
//         <NavItem {...items[0]} />
//         <NavItem {...items[1]} />
//         <RadixNavigationMenu.Item>
//           <RadixNavigationMenu.Trigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
//             Learn
//             <CaretDownIcon
//               className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
//               aria-hidden
//             />
//           </RadixNavigationMenu.Trigger>
//           <RadixNavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
//             <ul className="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
//               <li className="row-span-3 grid">
//                 <RadixNavigationMenu.Link asChild>
//                   <a
//                     className="focus:shadow-violet7 from-purple9 to-indigo9 flex
//                     h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]"
//                     href="/"
//                   >
//                     <svg
//                       aria-hidden
//                       width="38"
//                       height="38"
//                       viewBox="0 0 25 25"
//                       fill="white"
//                     >
//                       <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
//                       <path d="M12 0H4V8H12V0Z"></path>
//                       <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
//                     </svg>
//                     <div className="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] text-white">
//                       Radix Primitives
//                     </div>
//                     <p className="text-mauve4 text-[14px] leading-[1.3]">
//                       Unstyled, accessible components for React.
//                     </p>
//                   </a>
//                 </RadixNavigationMenu.Link>
//               </li>

//               <ListItem href="https://stitches.dev/" title="Stitches">
//                 CSS-in-JS with best-in-class developer experience.
//               </ListItem>
//               <ListItem href="/colors" title="Colors">
//                 Beautiful, thought-out palettes with auto dark mode.
//               </ListItem>
//               <ListItem href="https://icons.radix-ui.com/" title="Icons">
//                 A crisp set of 15x15 icons, balanced and consistent.
//               </ListItem>
//             </ul>
//           </RadixNavigationMenu.Content>
//         </RadixNavigationMenu.Item>

//         <RadixNavigationMenu.Item>
//           <RadixNavigationMenu.Trigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
//             Overview
//             <CaretDownIcon
//               className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
//               aria-hidden
//             />
//           </RadixNavigationMenu.Trigger>
//           <RadixNavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto">
//             <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3">
//               <ListItem
//                 title="Introduction"
//                 href="/docs/primitives/overview/introduction"
//               >
//                 Build high-quality, accessible design systems and web apps.
//               </ListItem>
//               <ListItem
//                 title="Getting started"
//                 href="/docs/primitives/overview/getting-started"
//               >
//                 A quick tutorial to get you up and running with Radix
//                 Primitives.
//               </ListItem>
//               <ListItem
//                 title="Styling"
//                 href="/docs/primitives/overview/styling"
//               >
//                 Unstyled and compatible with any styling solution.
//               </ListItem>
//               <ListItem
//                 title="Animation"
//                 href="/docs/primitives/overview/animation"
//               >
//                 Use CSS keyframes or any animation library of your choice.
//               </ListItem>
//               <ListItem
//                 title="Accessibility"
//                 href="/docs/primitives/overview/accessibility"
//               >
//                 Tested in a range of browsers and assistive technologies.
//               </ListItem>
//               <ListItem
//                 title="Releases"
//                 href="/docs/primitives/overview/releases"
//               >
//                 Radix Primitives releases and their changelogs.
//               </ListItem>
//             </ul>
//           </RadixNavigationMenu.Content>
//         </RadixNavigationMenu.Item>

//         <RadixNavigationMenu.Item>
//           <RadixNavigationMenu.Link
//             className="text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
//             href="https://github.com/radix-ui"
//           >
//             Github
//           </RadixNavigationMenu.Link>
//         </RadixNavigationMenu.Item>

//         <RadixNavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
//           <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
//         </RadixNavigationMenu.Indicator>
//       </RadixNavigationMenu.List>

//       <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
//         <RadixNavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
//       </div>
//     </RadixNavigationMenu.Root>
//   );
// };

// // eslint-disable-next-line react/display-name
// const ListItem = React.forwardRef<
//   any,
//   React.DetailedHTMLProps<
//     React.AnchorHTMLAttributes<HTMLAnchorElement>,
//     unknown
//   >
// >(({ className, children, title, ...props }, forwardedRef) => (
//   <li>
//     <RadixNavigationMenu.Link asChild>
//       <a
//         className={classNames(
//           "focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors",
//           className
//         )}
//         {...props}
//         ref={forwardedRef}
//       >
//         <div className="text-violet12 mb-[5px] font-medium leading-[1.2]">
//           {title}
//         </div>
//         <p className="text-mauve11 leading-[1.4]">{children}</p>
//       </a>
//     </RadixNavigationMenu.Link>
//   </li>
// ));

// // eslint-disable-next-line react/display-name
// const LinkItemNext = React.forwardRef<any, React.ComponentProps<typeof Link>>(
//   ({ className, children, title, ...props }, forwardedRef) => (
//     <RadixNavigationMenu.Link asChild>
//       <Link
//         className={classNames(
//           "focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors",
//           className
//         )}
//         {...props}
//         ref={forwardedRef}
//       >
//         <div className="text-violet12 mb-[5px] font-medium leading-[1.2]">
//           {title}
//         </div>
//         <p className="text-mauve11 leading-[1.4]">{children}</p>
//       </Link>
//     </RadixNavigationMenu.Link>
//   )
// );

// export default NavigationMenu;

// const NavItem = ({
//   label,
//   items,
//   link,
//   level = 0,
// }: NavItem & { level?: number }) => {
//   if (!items) {
//     return (
//       <RadixNavigationMenu.Item>
//         <RadixNavigationMenu.Link
//           asChild
//           className="text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
//         >
//           <Link href={link || "/"}>{label}</Link>
//         </RadixNavigationMenu.Link>
//       </RadixNavigationMenu.Item>
//     );
//   }

//   if (level === 1) {
//     return (
//       <div>
//         <h2 className="font-bold">{label}</h2>
//         <ul className=" border-2 border-red">
//           {items.map((i, index) => {
//             return <NavItem key={index} {...i} />;
//           })}
//         </ul>
//       </div>
//     );
//   }

//   return (
//     <RadixNavigationMenu.Item>
//       <RadixNavigationMenu.Trigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
//         {label}
//         {items && (
//           <CaretDownIcon
//             className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
//             aria-hidden
//           />
//         )}
//       </RadixNavigationMenu.Trigger>
//       <RadixNavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
//         <ul className=" m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px]">
//           {items.map((i, index) => {
//             return <NavItem key={index} {...i} level={1} />;
//           })}
//         </ul>
//       </RadixNavigationMenu.Content>
//     </RadixNavigationMenu.Item>
//   );
// };

export {};
