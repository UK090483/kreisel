import blockStyle from "./blockStyle";

type makeBlockProps = {
  content: any[];
  style?: any[];
  fieldsets?: {
    name: string;
    title: string;
    options?: { collapsible?: boolean; collapsed?: boolean; columns?: number };
  }[];
  preview?: any;
  name: string;
  title: string;
  type?: "object" | "document";
};

const makeBlock = ({
  name,
  title,
  content = [],
  style = [],
  fieldsets = [],
  preview,
  type = "object",
}: makeBlockProps) => {
  return {
    name,
    type,
    title,
    groups: [
      {
        name: "content",
        title: "Content",
        default: true,
      },
      {
        name: "style",
        title: "Style",
      },
    ],

    fieldsets: [
      {
        name: "space",
        title: "Space",
        options: { collapsible: true, collapsed: true, columns: 2 },
      },

      {
        name: "transitions",
        title: "Übergänge",
        options: { columns: 2 },
      },

      ...fieldsets,
    ],
    fields: [
      ...content.map((i) => ({ group: "content", ...i })),
      ...style.map((i) => ({ group: "style", ...i })),
      ...blockStyle(),
    ],
    preview,
  };
};

export default makeBlock;
