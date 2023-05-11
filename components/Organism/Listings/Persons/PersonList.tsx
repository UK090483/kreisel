import PersonListItem from "./PersonListItem";
import * as React from "react";

interface IPersonListProps {
  items?: any[] | null;
  title?: string | null;
}

const PersonList: React.FunctionComponent<IPersonListProps> = (props) => {
  const { items } = props;

  return (
    <ul className="flex w-full flex-wrap items-center justify-center">
      {items?.map((i, index) => (
        <PersonListItem key={index} {...i} />
      ))}
    </ul>
  );
};

export default PersonList;
