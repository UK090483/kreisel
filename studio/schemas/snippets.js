export const defaultBockContent = {
  name: "content",
  type: "array",
  title: "Page sections",
  description: "Add, edit, and reorder sections",
  of: [
    { type: "section" },
    { type: "hero" },
    { type: "listing" },
    { type: "onPageNav" },
    { type: "trust" },
  ],
};

export function colorList(skip) {
  const list = [
    { title: "Black", value: "black" },
    { title: "White", value: "white" },
    { title: "Primary", value: "primary" },
    { title: "Primary-Light", value: "primary-light" },
    { title: "Secondary", value: "secondary" },
    { title: "Secondary-Light", value: "secondary-light" },
    { title: "Grey", value: "grey" },
    { title: "Grey-Light", value: "grey-light" },
  ];
  if (!Array.isArray(skip)) return list;

  return list.filter((listItem) => !skip.includes(listItem.value));
}

export function sizesList(skip) {
  const list = [
    { title: "s", value: "s" },
    { title: "m", value: "m" },
    { title: "l", value: "l" },
    { title: "xl", value: "xl" },
    { title: "xxl", value: "xxl" },
  ];
  if (!Array.isArray(skip)) return list;

  return list.filter((listItem) => !skip.includes(listItem.value));
}
