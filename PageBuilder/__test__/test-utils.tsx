export {};

// import { textBlock } from "./richtextTestPrepare";

// import { ImageResult } from "PageBuilder/constants";

// import { PageBuilderContextProvider } from "PageBuilder/lib/PageBuilderContext";
// import { PageResult } from "pages/[[...slug]]";
// import { render, RenderOptions } from "@testing-library/react";
// import { parse, evaluate } from "groq-js";
// import type { SanityClient } from "@sanity/client/sanityClient";

// // // Add in any providers here if necessary:
// const Wrap: React.FC<React.PropsWithChildren<{ data?: PageResult }>> = ({
//   children,
//   data,
// }) => {
//   return (
//     <>
//       <PageBuilderContextProvider
//         data={{
//           _type: "page",
//           body: [],
//           menu: { mainNav: [], langSwitcher: {} },
//           seo: {},
//           slug: "testSlug",
//           description: "testDescription",
//           title: "TestTitle",
//           mainImage: testImage(),
//         }}
//       >
//         {children}
//       </PageBuilderContextProvider>
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

// // jest.mock("@lib/SanityService/sanity.server", () => {
// //   return {
// //     __esModule: true,
// //     sanityClient: jest.fn(),
// //     previewClient: jest.fn(),
// //   };
// // });

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

// type TestImage = (props?: Partial<ImageResult>) => ImageResult;
// export const testImage: TestImage = (props = {}) => {
//   return {
//     alt: "testImage",
//     aspectRatio: 1,
//     height: 10,
//     width: 10,
//     id: "testid",
//     lqip: "/any",
//     type: "any",
//     url: "/testUrl",
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

// type MockSanityClient = {
//   mockReturnValue?: any;
//   database?: any;
// };

// export const mockClient = (props?: MockSanityClient) => {
//   const { mockReturnValue, database } = props || {
//     mockReturnValue: null,
//     database: null,
//   };

//   return {
//     fetch: (query: string) => {
//       if (mockReturnValue) {
//         return Promise.resolve(mockReturnValue);
//       }

//       return fetchMock(database, query);
//     },
//   } as unknown as SanityClient;
// };

// export const mockGetClient = (props: MockSanityClient) => {
//   return () => mockGetClient(props);
// };

// const fetchMock = async (dataset: any, query: string) => {
//   let tree = parse(query);
//   let value = await evaluate(tree, { dataset });
//   return await value.get();
// };
