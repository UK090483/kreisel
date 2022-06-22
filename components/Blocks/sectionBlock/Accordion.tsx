import { SectionProps } from "@components/Section/Section";
import useSectionWidth from "@components/Section/useSectionWidth";
import Svg from "@components/Svg";
import useQueryState from "@hooks/useQueryState";
import React, { FC } from "react";

type AccordionProps = {
  condition: boolean;
  title?: string;
  width: SectionProps["width"];
};

const Accordion: FC<AccordionProps> = ({
  condition,
  children,
  title,
  width,
}) => {
  const { SetValue, value } = useQueryState("accordion");
  const _key = React.useMemo(() => fixedEncodeURIComponent(title), [title]);
  const open = value === _key;
  const handleClick = () => {
    SetValue(open ? null : _key);
  };
  const widthClasses = useSectionWidth({ width, noPadding: false });
  if (!condition) return <>{children}</>;

  console.log({ width, widthClasses });

  return (
    <div
      className={`relative  ${
        open ? "max-h-[999px]" : "max-h-16"
      }    transition-all overflow-hidden`}
    >
      <div
        className={`w-full pl-3 transition-colors bg-primary-light  ${
          open ? " delay-200 duration-700" : ""
        }      z-10 `}
      >
        <button
          onClick={handleClick}
          className={
            " w-full mx-auto h-16 flex items-center bg-primary-light font-bold " +
            widthClasses
          }
        >
          <Svg
            icon="chevronRight"
            className={`transition-transform border-2 p-0.5 mr-6 flex-shrink-0  rounded-full border-black ${
              open ? "rotate-90" : ""
            }`}
          />
          <div className=" text-left ">{title}</div>
        </button>
      </div>
      {children}
    </div>
  );
};

export default Accordion;

function fixedEncodeURIComponent(str?: string) {
  if (!str) return makeId(6);
  const slug_fyd = str.toLowerCase().replace(/\s+/g, "-");
  return encodeURIComponent(slug_fyd).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16);
  });
}

function makeId(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
