// import { AppContextProvider } from "@components/AppContext";
// import { textBlock } from "@components/RichText/testPrepare";
// import { ImageMetaResult } from "@lib/SanityImage/query";
// import { render, RenderOptions } from "@testing-library/react";
// import { PageResult } from "pages/[[...slug]]";

// // Add in any providers here if necessary:
// const Wrap: React.FC<{ data?: PageResult }> = ({ children, data }) => {
//   return (
//     <>
//       <AppContextProvider hostName="testHost" data={data}>
//         {children}
//       </AppContextProvider>
//     </>
//   );
// };

// type CustomRenderOptions = {
//   data?: PageResult;
//   jest?: RenderOptions;
// };

// const useRouter = jest.spyOn(require("next/router"), "useRouter");

// jest.mock("@components/Link", () => {
//   return {
//     __esModule: true,
//     //@ts-ignore
//     default: ({ children, ...rest }) => {
//       return <a {...rest}>{children}</a>;
//     },
//   };
// });

// jest.mock("@components/Link", () => {
//   return {
//     __esModule: true,
//     //@ts-ignore
//     default: ({ children, href }) => {
//       return <a href={href}>{children}</a>;
//     },
//   };
// });

// jest.mock("@lib/SanityService/sanity.server", () => {
//   return {
//     __esModule: true,
//     sanityClient: jest.fn(),
//     previewClient: jest.fn(),
//   };
// });

// const customRender = (
//   ui: React.ReactElement,
//   options?: CustomRenderOptions
// ) => {
//   useRouter.mockImplementation(() => ({ route: "/" }));

//   return render(ui, {
//     wrapper: ({ children }) => <Wrap data={options?.data}>{children}</Wrap>,
//     ...jest,
//   });
// };

// export * from "@testing-library/react";

// export { customRender };

// type TestImage = (props?: Partial<ImageMetaResult>) => ImageMetaResult;
// export const testImage: TestImage = (props = {}) => {
//   return {
//     alt: "testImage",
//     aspectRatio: 1,
//     height: 10,
//     width: 10,
//     id: "testid",
//     lqip: "any",
//     type: "any",
//     url: "testUrl",
//     ...props,
//   };
// };

// type TestTextProps = {
//   text?: string;
//   marks?: string[];
// };
// type TestText = (props?: TestTextProps) => {};
// export const testText: TestText = (props) => {
//   return textBlock({
//     text: props?.text || "testText",
//     style: "normal",
//     marks: props?.marks || [],
//   });
// };

export {};
