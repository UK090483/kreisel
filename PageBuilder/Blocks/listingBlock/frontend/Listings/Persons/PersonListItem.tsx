import Avatar from "components/Avatar";
import * as React from "react";
import type { ImageMetaResult } from "lib/SanityImage/query";

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
