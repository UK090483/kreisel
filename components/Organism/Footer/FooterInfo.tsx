import Portable from "PageBuilder/RichText/PortableText";
// import Kreisel from "components/Atoms/Kreisel";
import Section from "components/Atoms/Section/Section";
import useSectionWidth from "components/Atoms/Section/useSectionWidth";
import Kreisel from "components/Atoms/Kreisel";
import React from "react";
import clsx from "clsx";

interface IFooterInfoItem {
  _key: string;
  content?: any;
}
interface IFooterInfo {
  items?: IFooterInfoItem[];
}

const FooterInfo = ({ items }: IFooterInfo) => {
  const className = useSectionWidth({ width: "s" });
  if (!items) return null;

  return (
    <>
      {/* <div className={clsx(" h-24 bg-primary-light flex justify-center")}>
        <div
          className={clsx(
            className,
            "w-full border-b-2 border-primary-xLight "
          )}
        ></div>
      </div> */}

      <Section
        bgColor="primary-light"
        width="l"
        className="flex flex-wrap py-24"
      >
        <ItemWrap width="1/2">
          <div className=" flex justify-center items-center">
            <Kreisel className="mx-auto  w-1/4 md:mx-0 " />
          </div>
        </ItemWrap>
        {items.map((i) => (
          <ItemWrap key={i._key} width="1/4">
            <FooterInfoItem {...i} />
          </ItemWrap>
        ))}
      </Section>
    </>
  );
};

const FooterInfoItem: React.FC<IFooterInfoItem> = (props) => {
  return <Portable content={props.content} />;
};

const ItemWrap: React.FC<React.PropsWithChildren<{ width: "1/4" | "1/2" }>> = ({
  children,
  width,
}) => {
  return (
    <div
      className={clsx("shrink-0 pb-20 pl-3 text-center md:pb-0 md:text-left", {
        "w-full  md:w-1/4": width === "1/4",
        "w-full  md:w-1/2": width === "1/2",
      })}
    >
      {children}
    </div>
  );
};

export default FooterInfo;
