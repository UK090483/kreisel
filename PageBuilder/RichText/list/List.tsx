import Typo from "components/Atoms/Typography/Typography";
import clsx from "clsx";
import * as React from "react";
import {
  PortableTextListComponent,
  PortableTextListItemComponent,
} from "@portabletext/react";

export const List: PortableTextListComponent = (props) => {
  return (
    <Typo
      data-testid="list"
      variant={props.value.listItem === "bullet" ? "ul-disc" : "ul-decimal"}
      className={clsx({ "pb-6 last:pb-0  inline-block": props.value.level })}
    >
      {props.children}
    </Typo>
  );
};

export const ListItem: PortableTextListItemComponent = (props) => {
  return (
    <Typo
      data-testid="listItem"
      variant="li"
      className={clsx({
        "first:mt-0 last:mb-0": props.value.level === 1,
      })}
    >
      {props.children}
    </Typo>
  );
};
