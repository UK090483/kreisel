import Overlay from "./Overlay";
import Search from "./Search";
import TherapistListItem from "./TherapistListItem";
import Pagination from "./Pagination";
import { Section } from "components/Section/Section";
import { TherapistResult } from "PageBuilder/Blocks/listingBlock/listingBlock.query";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface TherapistListProps {
  items: TherapistResult[];
}

const itemCount = 10;

const TherapistList: React.FC<TherapistListProps> = (props) => {
  const { items } = props;

  const [page, setPage] = useState(1);
  const {
    query: { therapeut, name, plz, city },
  } = useRouter();

  const filteredItems = items.filter((i) => {
    if (typeof name === "string") {
      return [i.firstName?.toLowerCase(), i.name?.toLowerCase()]
        .join(" ")
        .match(name.toLowerCase());
    }
    if (typeof plz === "string") {
      return i.zipCode?.startsWith(plz);
    }

    if (typeof city === "string") {
      return i.city?.toLocaleLowerCase().startsWith(city);
    }
    return true;
  });

  return (
    <>
      <Section className="py-20">
        <Search />
        <Pagination
          itemCount={filteredItems.length}
          page={page}
          onChange={(next) => setPage(next)}
        />

        <ul>
          {filteredItems
            .slice((page - 1) * itemCount, page * itemCount)
            .map((item) => (
              <TherapistListItem key={item._id} {...item} />
            ))}
        </ul>
      </Section>
      {therapeut && (
        <div className="fixed top-0 z-10 flex h-screen  w-full items-start justify-center overflow-scroll bg-black bg-opacity-40 pt-32 pb-4">
          <Overlay items={items} therapist={therapeut.toString()} />
        </div>
      )}
    </>
  );
};

export default TherapistList;
