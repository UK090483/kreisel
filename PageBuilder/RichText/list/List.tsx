import clsx from "clsx";
import * as React from "react";

interface IListProps {
  type?: string;
}

export const List: React.FC<IListProps> = (props: any) => {
  const firstLevel = props.level === 1;
  return (
    <ul
      data-testid="list"
      className={clsx(`list-outside ml-4 marker:text-primary marker:  `, {
        "pb-4": firstLevel,
        "list-decimal": props?.type === "number",
        "list-disc": props?.type !== "number",
      })}
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
