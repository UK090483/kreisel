import PersonListItem from "./PersonListItem";
import * as React from "react";

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
    <ul className="w-full flex flex-wrap items-center justify-center">
      {isMounted &&
        items?.map((i, index) => <PersonListItem key={index} {...i} />)}
    </ul>
  );
};

export default PersonList;
