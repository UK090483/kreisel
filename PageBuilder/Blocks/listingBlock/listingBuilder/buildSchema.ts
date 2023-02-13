import { listingBuilderItem } from "./types";
import { defineField } from "sanity";

const buildContentTypeField = (items: listingBuilderItem[]) => {
  return defineField({
    group: "content",
    title: `Content type`,
    name: `contentType`,
    type: "string",
    options: {
      list: [...items.map((i) => ({ title: i.title, value: i.name }))],
      layout: "radio",
    },
  });
};

const buildVariantFields = (items: listingBuilderItem[]) => {
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

const buildFilterFields = (items: listingBuilderItem[]) => {
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

const buildReferenceListFields = (items: listingBuilderItem[]) => {
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

const buildListingFields = (items: listingBuilderItem[]) => {
  return [
    buildContentTypeField(items),
    ...buildFilterFields(items),
    ...buildVariantFields(items),
    ...buildReferenceListFields(items),
  ];
};

export { buildListingFields };
