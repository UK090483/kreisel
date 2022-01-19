import React, { useState } from "react";
import { Section } from "@components/Section";
import { TherapistResult } from "@components/Blocks/listingBlock/ListingsBlock";
import { useRouter } from "next/router";
import Overlay from "./Overlay";
import Search from "./Search";
import TherapistListItem from "./TherapistListItem";
import Pagination from "./Pagination";

interface TherapistListProps {
  items: TherapistResult[];
}

const itemCount = 10;

const TherapistList: React.FC<TherapistListProps> = (props) => {
  const { items } = props;
  const [page, setPage] = useState(1);
  const {
    query: { therapeut },
  } = useRouter();

  return (
    <>
      <Section className="py-20">
        <Search />
        <Pagination
          itemCount={items.length}
          page={page}
          onChange={(next) => setPage(next)}
        />

        <ul>
          {items.slice((page - 1) * itemCount, page * itemCount).map((item) => (
            <TherapistListItem key={item._id} {...item} />
          ))}
        </ul>
      </Section>
      {therapeut && (
        <div className="fixed top-0 z-10 w-full h-screen  overflow-scroll flex justify-center items-start pt-32 pb-4 bg-black bg-opacity-40">
          <Overlay items={items} therapist={therapeut.toString()} />
        </div>
      )}
    </>
  );
};

export default TherapistList;
