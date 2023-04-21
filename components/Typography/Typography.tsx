import React from "react";
import clsx from "clsx";

type ElementKeys = keyof Pick<
  JSX.IntrinsicElements,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "ul" | "li"
>;

type mappingObject = { [Key: string]: ElementKeys };

const variantsMapping: mappingObject = {
  "ul-decimal": "ul",
  "ul-disc": "ul",
  li: "li",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subheading1: "h6",
  subheading2: "h6",
  body: "p",
  "body-l": "p",
};
interface TypographyProps {
  variant?:
    | "p"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body"
    | "body-l"
    | "body-s"
    | "subheading1"
    | "subheading2"
    | "ul-decimal"
    | "ul-disc"
    | "li";

  as?: ElementKeys;
  className?: string;
  spacer?: boolean;
  bold?: boolean;
  space?: boolean;
  "data-testid"?: string;
}

const HeaderMap = ["h1", "h2", "h3", "h4", "h5", "h6"];

const Typo: React.FC<React.PropsWithChildren<TypographyProps>> = (props) => {
  const {
    variant = "body",
    children,
    className = "",
    as,
    spacer = false,
    bold,
    space,
  } = props;
  const Component: ElementKeys = as ? as : variantsMapping[variant] || "p";
  const isHeader =
    bold !== undefined ? bold : HeaderMap.includes(variant as string);

  if (spacer) {
    return <div className="h-14" />;
  }

  return (
    <Component
      data-testid={props["data-testid"]}
      className={clsx(
        // "relative scale-100 antialiased",
        {
          "pb-6 last:pb-0": space !== false && variant === "body",
          "text-sm ": variant === "body-s",
          "text-base ": variant === "body",
          "text-lg": ["body-l", "h6"].includes(variant as string),
          "text-base": variant === "h5",
          "pb-[0.6em] text-xl sm:text-2xl": variant === "h4",
          "pb-[0.6em] text-2xl sm:text-3xl": variant === "h3",
          "pb-[0.6em] text-3xl sm:text-4xl": variant === "h2",
          "pb-[0.8em] text-4xl sm:text-5xl": variant === "h1",
          "font-header font-bold last:pb-0": isHeader,

          //lists
          "ml-4  list-outside marker:text-primary":
            variant === "ul-decimal" || variant === "ul-disc",
          "list-decimal": variant === "ul-decimal",
          "list-disc": variant === "ul-disc",
          "my-3 pl-2": variant === "li",
        },
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Typo;
