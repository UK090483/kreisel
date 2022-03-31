import { Section } from "@components/Section/Section";
import Typo from "@components/Typography/Typography";
import * as React from "react";

import PersonListItem from "./PersonListItem";

interface IPersonListProps {
  items?: any[] | null;
  title?: string | null;
}

const PersonList: React.FunctionComponent<IPersonListProps> = (props) => {
  const { items, title } = props;
  const [isMounted, setIsMounted] = React.useState(false); // Need this for the react-tooltip

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Section width="l" className=" overflow-hidden pb-12 pt-24 ">
      {title && (
        <Typo
          variant="h3"
          as="h2"
          className="text-center uppercase pb-12 md:pb-24 pt-6 md:pt-12 "
        >
          {title}
        </Typo>
      )}
      <ul className="w-full flex flex-wrap items-center justify-center">
        {isMounted &&
          items?.map((i, index) => <PersonListItem key={index} {...i} />)}
      </ul>
    </Section>
  );
};

export default PersonList;
