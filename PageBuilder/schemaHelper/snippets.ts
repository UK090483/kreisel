export const defaultBockContent = {
  name: "content",
  type: "array",
  title: "Page sections",
  description: "Add, edit, and reorder sections",
  of: [
    { type: "section" },
    { type: "hero" },
    { type: "listing" },
    { type: "trust" },
    { type: "reusable" },
  ],
};

export function colorList(skip?: any) {
  const list = [
    { title: "Primary", value: "primary" },
    { title: "Primary-Light", value: "primary-light" },
    { title: "Primary-XLight", value: "primary-xLight" },
    { title: "Secondary", value: "secondary" },
    { title: "Secondary-Light", value: "secondary-light" },
    { title: "Grey", value: "grey" },
    { title: "Grey-Light", value: "grey-light" },
  ];
  if (!Array.isArray(skip)) return list;

  return list.filter((listItem) => !skip.includes(listItem.value));
}
// export type ColorList =
//   | "primary"
//   | "primary-light"
//   | "primary-xLight"
//   | "secondary"
//   | "secondary-light"
//   | "grey"
//   | "grey-light";

export function sizesList(skip?: any) {
  const list = [
    { title: "noSpace", value: "noSpace" },
    { title: "s", value: "s" },
    { title: "m", value: "m" },
    { title: "l", value: "l" },
    { title: "xl", value: "xl" },
    { title: "xxl", value: "xxl" },
  ];
  if (!Array.isArray(skip)) return list;

  return list.filter((listItem) => !skip.includes(listItem.value));
}
export type SizeList = "noSpace" | "s" | "m" | "l" | "xl" | "xxl";
