import { listingBuilderItem, listingBuilderItemFilter } from "./types";

const getVariant = (items: listingBuilderItem[]) =>
  items
    .filter((i) => !!i.variants)
    .reduce(
      (acc, item, index, all) =>
        acc +
        `contentType == "${item.name}" => ${item.name}Variants ${
          all.length - 1 === index ? "" : ","
        }`,
      "select("
    ) + "),";

const getFilterOrder = (filter: listingBuilderItemFilter) =>
  filter.queryFilter?.order ? `| order(${filter.queryFilter.order})` : "";
const getFilterSlice = (filter: listingBuilderItemFilter) =>
  filter.queryFilter?.slice
    ? `[${filter.queryFilter.slice.start}...${filter.queryFilter.slice.end}]`
    : "";

const getFilterQuery = (item: listingBuilderItem) => {
  if (!item.filter) return "";
  return item.filter.reduce((acc, filter) => {
    if (!filter?.queryFilter?.filter) return acc;
    return (
      acc +
      `contentType == "${item.name}" && ${item.name}Filter == "${
        filter.value
      }"  => *[_type == "${item.name}" && ${
        filter.queryFilter.filter
      }]${getFilterOrder(filter)}${getFilterSlice(filter)},`
    );
  }, "");
};

const getReferenceQuery = (item: listingBuilderItem) => {
  return `contentType == "${item.name}" => ${item.name}Items`;
};

const getItemQuery = (items: listingBuilderItem[]) => {
  return (
    items.reduce(
      (acc, item, index, all) =>
        acc +
        getFilterQuery(item) +
        getReferenceQuery(item) +
        `${all.length - 1 === index ? "" : ","}`,
      "select("
    ) + ")"
  );
};

function buildQuery(
  items: listingBuilderItem[],
  baseProjection: string
): string {
  const res = `
  ...,
   contentType,
  'items': ${getItemQuery(items)}[]{${baseProjection}},
  'variant': ${getVariant(items)}
  `;
  return res;
}

export default buildQuery;
