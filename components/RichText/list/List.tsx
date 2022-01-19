import * as React from "react";

interface IListProps {}

const List: React.FC = (props: any) => {
  return (
    <ul
      className={`${
        props?.type === "number" ? "list-decimal" : "list-disc"
      } list-inside pb-4`}
    >
      {props.children}
    </ul>
  );
};

export default List;
