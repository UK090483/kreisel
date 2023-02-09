const defaultImageSchema = {
  title: "Image",
  name: "defaultImage",
  type: "image",

  options: {
    hotspot: true,
  },
  fields: [
    {
      title: "Alternative text",
      name: "alt",
      type: "string",
      description: "Important for SEO and accessibility.",

      validation: (Rule: any) => {
        return Rule.custom((field: any, context: any) => {
          return "asset" in context.parent && field === undefined
            ? "Required! (think about non-visual readers)"
            : true;
        });
      },
    },
  ],
  preview: {
    select: {
      asset: "asset",
      alt: "alt",
    },
    prepare({ alt, asset }: any) {
      return {
        title: alt || "(alt text missing)",
        media: asset,
      };
    },
  },
};

export default defaultImageSchema;
