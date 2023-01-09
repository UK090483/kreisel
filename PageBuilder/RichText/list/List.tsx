import * as React from "react";

interface IListProps {
  type?: string;
}

export const List: React.FC<IListProps> = (props: any) => {
  return (
    <ul
      data-testid="list"
      className={`${
        props?.type === "number" ? "list-decimal" : "list-disc"
      } list-outside ml-4 marker:text-primary pb-4 `}
    >
      {props.children}
    </ul>
  );
};

export const ListItem: React.FC<IListProps> = (props: any) => {
  return (
    <li data-testid="listItem" className={` pb-3`}>
      {props.children}
    </li>
  );
};
