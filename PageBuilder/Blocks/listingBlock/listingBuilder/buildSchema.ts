import { defineField } from "sanity";
import { listingBuilderItem } from "./types";

export const buildVariantFields = (items: listingBuilderItem[]) => {
  return items
    .filter((i) => !!i.variants)
    .map((i) =>
      defineField({
        group: "content",
        title: `Variants`,
        name: `${i.name}Variants`,
        type: "string",
        options: {
          list: [
            ...[...(i.variants ? i.variants : [])].map((i) => ({
              title: i.title,
              value: i.value,
            })),
          ],
        },
        hidden: (props: any) => props?.parent?.contentType !== i.name,
      })
    );
};

export const buildFilterFields = (items: listingBuilderItem[]) => {
  return items
    .filter((i) => !!i.filter)
    .map((i) =>
      defineField({
        group: "content",
        title: `Filter`,
        name: `${i.name}Filter`,
        type: "string",
        options: {
          list: [
            ...[...(i.filter ? i.filter : [])].map((i) => ({
              title: i.title,
              value: i.value,
            })),
          ],
        },
        hidden: (props: any) => props?.parent?.contentType !== i.name,
      })
    );
};

export const buildReferenceListFields = (items: listingBuilderItem[]) => {
  return items
    .filter((i) => !!i.items)
    .map((i) =>
      defineField({
        group: "content",
        title: `${i.title} Items`,
        name: `${i.name}Items`,
        type: "array",
        of: [...(i.items ? i.items : [])],
        hidden: (props: any) => props?.parent?.contentType !== i.name,
      })
    );
};
