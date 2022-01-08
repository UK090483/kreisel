import { Section } from "@components/Section";
import useQueryState from "@hooks/useQueryState";
import { TherapistResult } from "@services/pageBuilderService/Blocks/listingBlock/ListingsBlock";
import React from "react";

import TherapistListItem from "./TherapistListItem";

interface TherapistListProps {
  items: TherapistResult[];
}

const TherapistList: React.FC<TherapistListProps> = (props) => {
  const { items } = props;
  const { value, SetValue } = useQueryState("therapist");
  const setActive = (id: string | null) => {
    SetValue(id);
  };

  return (
    <Section>
      <ul className=" py-56 ">
        {items.map((item) => (
          <TherapistListItem
            key={item._id}
            {...item}
            active={value === item._id}
            setActive={setActive}
          />
        ))}
      </ul>
    </Section>
  );
};

export default TherapistList;
