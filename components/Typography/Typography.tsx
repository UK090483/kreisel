import React from "react";
import clsx from "clsx";

type ElementKeys = keyof Pick<
  JSX.IntrinsicElements,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
>;

type mappingObject = { [Key: string]: ElementKeys };

const variantsMapping: mappingObject = {
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
    | "subheading2";
  as?: ElementKeys;
  className?: string;
  spacer?: boolean;
  hand?: boolean;
  bold?: boolean;
  space?: boolean;
}

const boldMap = ["h1", "h2", "h3", "h4", "h5", "h6"];

const Typo: React.FC<TypographyProps> = ({
  variant = "body",
  children,
  className = "",
  as,
  spacer = false,
  hand = false,
  bold,
  space,
}) => {
  const Component: ElementKeys = as ? as : variantsMapping[variant] || "p";
  const isBold =
    bold !== undefined ? bold : boldMap.includes(variant as string);

  if (spacer) {
    return <div className=" h-14" />;
  }

  return (
    <Component
      style={{
        paddingBottom: space === undefined ? "1em" : space ? "1em" : undefined,
      }}
      className={
        clsx({
          "font-hand ": hand,
          " text-sm ": variant === "body-s",
          "text-base": variant === "body",
          "text-lg": ["body-l", "h6"].includes(variant as string),
          "text-xl": variant === "h5",
          "text-2xl": variant === "h4",
          "text-3xl": variant === "h3",
          "text-2xl sm:text-4xl": variant === "h2",
          "text-3xl sm:text-5xl": variant === "h1",
          "font-bold": isBold,
        }) + ` ${className}`
      }
    >
      {children}
    </Component>
  );
};

export default Typo;
