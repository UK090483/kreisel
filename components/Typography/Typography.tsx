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
    | "subheading2";
  as?: ElementKeys;
  className?: string;
  spacer?: boolean;

  bold?: boolean;
  space?: boolean;
}

const boldMap = ["h1", "h2", "h3", "h4", "h5", "h6"];

const Typo: React.FC<React.PropsWithChildren<TypographyProps>> = ({
  variant = "body",
  children,
  className = "",
  as,
  spacer = false,
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
      className={
        clsx("antialiased relative scale-100", {
          "pb-[0.8em]": space !== false && variant !== "body",
          "pb-[2em] last:pb-0": space !== false && variant === "body",
          "text-sm ": variant === "body-s",
          "text-base ": variant === "body",
          "text-lg ": ["body-l", "h6"].includes(variant as string),
          "text-bale font-header": variant === "h5",
          "text-lg  sm:text-2xl font-header": variant === "h4",
          "text-xl sm:text-3xl font-header": variant === "h3",
          "text-2xl  sm:text-4xl font-header": variant === "h2",
          "text-3xl sm:text-5xl font-header": variant === "h1",
          "font-bold": isBold,
        }) + ` ${className}`
      }
    >
      {children}
    </Component>
  );
};

export default Typo;
