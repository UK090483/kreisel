import { IFooterInfo, IFooterInfoItem } from "../Footer.query";
import Portable from "PageBuilder/RichText/PortableText";
import Kreisel from "components/Kreisel";
import { Section } from "components/Section/Section";
import React from "react";
import clsx from "clsx";

type Props = {
  footerInfo?: IFooterInfo;
};

const FooterInfo = ({ footerInfo }: Props) => {
  const footerInfoData = footerInfo;
  const items = footerInfoData?.items;

  if (!items) return null;

  return (
    <Section bg="primary-light" width="l" className="flex flex-wrap py-12">
      <ItemWrap width="1/2">
        <Kreisel className="mx-auto  w-1/2 md:mx-0 " />
      </ItemWrap>
      {items.map((i) => (
        <ItemWrap key={i._key} width="1/4">
          <FooterInfoItem {...i} />
        </ItemWrap>
      ))}
    </Section>
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
