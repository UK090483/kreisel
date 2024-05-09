"use client";

import Search from "./Search";
import TherapistListItem from "./TherapistListItem";
import Pagination from "./Pagination";
import { TherapistResult } from "./therapist.query";
import Overlay from "./Overlay";
import Section from "components/Atoms/Section/Section";

import useRouter from "components/Adapter/useRouterAdapter";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

export interface TherapistListProps {
  offersInternship?: boolean;
}

const itemCount = 10;
//@ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const TherapistList: React.FC<TherapistListProps> = (props) => {
  const { data, error } = useSWR<{ member: TherapistResult[] }>(
    "/api/therapist",
    fetcher
  );

  const items: TherapistResult[] = data?.member || [];

  const [page, setPage] = useState(1);
  const {
    query: { therapist, name, plz, city },
  } = useRouter();

  useEffect(() => {
    setPage(1);
  }, [plz]);

  const filteredItems = items.filter((i) => {
    if (typeof name === "string") {
      return [i.firstName?.toLowerCase(), i.name?.toLowerCase()]
        .join(" ")
        .match(name.toLowerCase());
    }
    if (typeof plz === "string") {
      return i.zipCode ? plz.split(",").includes(i.zipCode.slice(0, 2)) : false;
    }

    if (typeof city === "string") {
      return i.city?.toLocaleLowerCase().startsWith(city);
    }
    return true;
  });

  return (
    <>
      <Section className="py-20">
        {data && data.member && <Search data={data.member} />}
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
      {therapist && (
        // <div className="fixed inset-0 z-10 flex h-screen  w-full items-start justify-center overflow-scroll bg-black bg-opacity-40 pt-32 pb-4">
        <Overlay items={items} therapist={therapist.toString()} />
        // </div>
      )}
    </>
  );
};
export default TherapistList;
