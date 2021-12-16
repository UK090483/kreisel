import Svg from "@components/Svg";
import Typo from "@components/Typography/Typography";
import useQueryState from "@hooks/useQueryState";
import React, { FC, useState } from "react";

type AccodionProps = {
  condition: boolean;
  title?: string;
};

const Accordion: FC<AccodionProps> = ({ condition, children, title }) => {
  // const [open, setOpen] = useState(false);

  const { SetValue, value } = useQueryState("accorion");
  const _key = React.useMemo(() => string_to_slug(title), [title]);

  const open = value === _key;

  const handleClick = () => {
    SetValue(open ? null : _key);
  };

  if (!condition) return <>{children}</>;

  return (
    <div
      className={`relative group ${
        open ? "max-h-[999px]" : "max-h-16"
      }    transition-all overflow-hidden`}
    >
      <div
        className={` w-full transition-colors bg-primary  ${
          open ? " delay-200 duration-700" : ""
        }      z-10 `}
      >
        <div
          onClick={handleClick}
          className=" max-w-screen-lg mx-auto h-16 flex items-center bg-primary  font-bold"
        >
          <Svg
            icon="chevronRight"
            className={`transition-transform border-2 p-0.5 mr-6 rounded-full border-black ${
              open ? "rotate-90" : ""
            }`}
          />
          {title}
        </div>
      </div>

      {children}
    </div>
  );
};

export default Accordion;

function string_to_slug(str?: string | null) {
  if (!str) return makeid(6);

  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }
  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}

function makeid(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
