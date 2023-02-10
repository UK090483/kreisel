import { ArrayOfType } from "sanity";

export type listingBuilderItem = {
  name: string;
  title: string;
  variants?: { value: string; title: string }[];
  filter?: listingBuilderItemFilter[];
  projection?: string;
  items?: ArrayOfType[];
};

export type listingBuilderItemFilter = {
  value: string;
  title: string;
  queryFilter: {
    filter: string;
    order?: string;
    slice?: { start: number; end: number };
  };
};
