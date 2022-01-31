import React from "react";
import { Section } from "@components/Section/Section";
import { useRouter } from "next/router";
import Overlay from "./Overlay";

interface ListProps {
  overlay: (q: any) => React.ReactNode;
  name: string;
}

const List: React.FC<ListProps> = (props) => {
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
