import Typo from "components/Typography/Typography";
import clsx from "clsx";
import * as React from "react";

interface IListProps {
  type?: string;
}
export const List: React.FC<IListProps> = (props: any) => {
  const firstLevel = props.level === 1;
  return (
    <Typo
      data-testid="list"
      variant={props?.type === "number" ? "ul-decimal" : "ul-disc"}
      className={clsx({ "pb-8 last:pb-0 ": firstLevel })}
    >
      {props.children}
    </Typo>
  );
};

export const ListItem: React.FC<IListProps> = (props: any) => {
  return (
    <Typo data-testid="listItem" variant="li">
      {props.children}
    </Typo>
  );
};
