import { listingBuilderItem } from "./listingBuilder/types";
import {
  AKTUELLES_PAGE_TYPE_ID,
  BLOG_PAGE_TYPE_ID,
} from "PageBuilder/constants";

type PagesListingItem = {
  items: string;
};

const listingBlockItems: listingBuilderItem[] = [
  {
    title: "Pages",
    name: "pages",
    items: [
      {
        type: "reference",
        to: [{ type: "page" }],
        options: { disableNew: true },
        validation: (rule) => rule.required(),
      },
    ],
    filter: [{ title: "Base", value: "base" }],
    variants: [
      { title: "Card (default)", value: "card" },
      { title: "small Card", value: "smallCard" },
    ],
  },
  {
    title: "Aktuelles",
    name: "aktuelles",
    filter: [{ title: "All", value: "all", queryFilter: { filter: "" } }],
    items: [
      {
        type: "reference",
        to: [{ type: "page" }],
        options: {
          filter: `pageType._ref == ${AKTUELLES_PAGE_TYPE_ID}`,
          disableNew: true,
        },
        validation: (rule) => rule.required(),
      },
    ],
  },
  {
    title: "Blogs",
    name: "blog",
    filter: [{ title: "All", value: "all", queryFilter: { filter: "" } }],
    items: [
      {
        type: "reference",
        to: [{ type: "page" }],
        options: {
          filter: `pageType._ref == ${BLOG_PAGE_TYPE_ID}`,
          disableNew: true,
        },
        validation: (rule) => rule.required(),
      },
    ],
  },
  {
    title: "Artikel",
    name: "article",
    filter: [{ title: "All", value: "all", queryFilter: { filter: "" } }],
    items: [
      {
        type: "reference",
        to: [{ type: "article" }],
        options: { disableNew: true },
        validation: (rule) => rule.required(),
      },
    ],
  },
  {
    title: "Testimonials",
    name: "testimonial",

    items: [
      {
        type: "reference",
        to: [{ type: "testimonial" }],
        validation: (rule) => rule.required(),
      },
    ],
  },
  {
    title: "Therapeuten",
    name: "therapist",
    filter: [
      { title: "All", value: "all", queryFilter: { filter: "defined(_id)" } },
    ],
  },
  {
    title: "People",
    name: "people",
    items: [
      {
        type: "reference",
        to: [{ type: "person" }],
        validation: (rule) => rule.required(),
      },
    ],
  },
  {
    title: "Custom",
    name: "custom",
    items: [
      {
        type: "reference",
        to: [{ type: "page" }],
      },
      {
        type: "object",
        name: "Custom Card",
        fields: [
          { name: "title", type: "string", title: "Name" },
          { name: "link", type: "link", title: "Link" },
          { name: "description", type: "text", title: "Description" },
          { name: "image", type: "defaultImage", title: "Image" },
        ],
      },
    ],
    variants: [
      { title: "Card (default)", value: "card" },
      { title: "small Card", value: "smallCard" },
    ],
  },
];

export default listingBlockItems;
