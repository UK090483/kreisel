import Typo from "@components/Typography/Typography";
import SanityImage from "@lib/SanityImage";
import type { ImageMetaResult } from "@lib/SanityImage/query";
import ReactTooltip from "react-tooltip";

import * as React from "react";

import Avatar from "@components/Avatar";

interface IPersonListItemProps {
  name?: null | string;
  position?: null | string;
  description?: null | string;
  avatar?: null | ImageMetaResult;
  variant?: string | null;
  _id: string;
}

const PersonListItem: React.FunctionComponent<IPersonListItemProps> = (
  props
) => {
  const { name, description, position, avatar, _id, variant } = props;

  const isImage = variant === "image";

  return (
    <li className="flex flex-col items-center justify-center w-full md:w-1/2  lg:w-1/3 self-start">
      <Avatar
        id={_id}
        description={description}
        image={avatar}
        title={name}
        subTitle={position}
      ></Avatar>
    </li>
  );
};

export default PersonListItem;
