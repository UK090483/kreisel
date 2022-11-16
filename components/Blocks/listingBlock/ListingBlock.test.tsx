import { mockClient } from "@lib/SanityPageBuilder/lib/MockClient";
import ListingBlock from "./ListingsBlock";
import { render } from "@testing-library/react";
import { listingBlockQuery } from "./listingBlockQuery";

const database: any[] = [];

const items = [
  {
    _createdAt: "2021-11-07T18:13:58Z",
    _id: "433f6b42-fb90-43fb-8e51-2d2c66764f52",
    _rev: "jyy2Xz6E5cXYJNp5EuG7tu",
    _type: "page",
    _updatedAt: "2022-01-26T13:14:14Z",

    date: "2021-11-07T18:13:58Z",
    href: "/blog/home-schooling",
    image: {
      _type: "defaultImage",
      alt: "überforderter Vater mit Kind",
      aspectRatio: 1.5,
      asset: {
        _ref: "image-c013c37ccb91f3500bf5f55d293d5605b5f54323-6720x4480-jpg",
        _type: "reference",
      },
      crop: null,
      height: 4480,
      hotspot: null,
      id: "c013c37ccb91f3500bf5f55d293d5605b5f54323",
      lqip: "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgAE/8QAJBAAAQMDBAEFAAAAAAAAAAAAAQIDBQAEEQYSISIxBxUyQWH/xAAWAQEBAQAAAAAAAAAAAAAAAAACBAX/xAAgEQABAwIHAAAAAAAAAAAAAAABAAIDERMSITJRYaHw/9oADAMBAAIRAxEAPwCmPUmJjLRbdu4t25Jx0HjP3WjSWsLCTaeMe0U3ST3ccHC/2iUrCsImLMtbUt7gjYUAjB80t0RpqNtEXQbaV2UT8sVEJo8IJrmteOMXKP09pn7sh0JUcZI5xVRh9lDTy0N7gkHgbqqN5m6L44w4gE09yv/Z",
      type: "image/jpeg",
      url: "https://cdn.sanity.io/images/jgnu3d9f/production/c013c37ccb91f3500bf5f55d293d5605b5f54323-6720x4480.jpg",
      width: 6720,
    },
    pageType: {
      _ref: "89a64d96-87b9-4e39-9cac-55666ae796fe",
      _type: "reference",
    },
    slug: {
      _type: "slug",
      current: "home-schooling",
    },
    title: "wie geht erfolgreiches Home Schooling ???",
  },
];

describe("ListingBlock", () => {
  // it("query should be valid ", async () => {
  //   const client = mockClient({ database });
  //   const res = await client.fetch(`*[_type == "page"]{
  //     'content':content[]{
  //       ${listingBlockQuery}
  //     }
  //   }`);
  // });
  it("should render no Items", async () => {
    render(
      <ListingBlock contentType="blog" _type="listing" _key="test" lang="de" />
    );
  });

  it("should render with Items", async () => {
    render(
      <ListingBlock
        contentType="blog"
        _type="listing"
        _key="test"
        lang="de"
        items={items}
      />
    );
  });
});
