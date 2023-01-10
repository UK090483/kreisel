import Overlay from "./Overlay";
import { Section } from "components/Section/Section";
import React, { PropsWithChildren } from "react";
import { useRouter } from "next/router";

interface ListProps {
  overlay: (q: any) => React.ReactNode;
  name: string;
}

const List: React.FC<PropsWithChildren<ListProps>> = (props) => {
  const { name, overlay, children } = props;
  const { query } = useRouter();

  return (
    <>
      <Section className="py-20">{children}</Section>
      {query[name] && (
        <div className="fixed left-0  top-0 z-10 w-full h-screen  overflow-scroll flex justify-center items-start pt-32 pb-4 bg-black bg-opacity-40">
          <Overlay>{overlay(query[name])}</Overlay>
        </div>
      )}
    </>
  );
};

export default List;
