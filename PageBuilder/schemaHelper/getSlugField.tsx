import { defineField } from "sanity";

export const getSlugField = (props?: { group?: string | false }) =>
  defineField({
    name: "slug",
    type: "slug",
    title: "Slug",
    description: "",
    options: {
      source: "title",
    },
    validation: (Rule: any) => [
      Rule.required(),
      Rule.custom((slug: any) => {
        if (!slug) return true;
        if (slug.current.indexOf(" ") >= 0)
          return "no whitespace allowed (use - for binding words)";
        if (slug.current.indexOf("/") >= 0)
          return "no backslashes allowed (use - for binding words)";
        if (slug.current.indexOf("\\") >= 0)
          return "no backslashes allowed (use - for binding words)";
        if (/[A-Z]/.test(slug.current)) return "no Capital letters allowed";
        if (
          /ü/.test(slug.current) ||
          /ä/.test(slug.current) ||
          /ö/.test(slug.current)
        )
          return `no "umlaut" use ü->ue, ä->ae, ö->oe `;
        if (/\./.test(slug.current) || /,/.test(slug.current))
          return `, and .  are not allowed`;
        return true;
      }).error(),
    ],
    group: props?.group === false ? undefined : props?.group || "base",
  });
