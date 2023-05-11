import Avatar from "components/Atoms/Avatar";
import Link from "components/Atoms/Link";
import * as React from "react";
import { ImageSrc } from "components/Atoms/Image";

export interface IPersonListItemProps {
  name?: null | string;
  position?: null | string;
  description?: null | string;
  avatar?: ImageSrc;
  variant?: string | null;
  href?: string | null;
  _id: string;
}

const PersonListItem: React.FunctionComponent<IPersonListItemProps> = (
  props
) => {
  const { name, description, position, avatar, _id, variant, href } = props;

  const Item = (
    <Avatar
      id={_id}
      description={description}
      image={avatar}
      title={name}
      subTitle={position}
    ></Avatar>
  );
  if (href) {
    return (
      <Wrap>
        <Link href={"person" + href}>{Item}</Link>
      </Wrap>
    );
  }

  return <Wrap>{Item}</Wrap>;
};

export default PersonListItem;

const Wrap: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <li className="flex w-full flex-col items-center justify-center self-start  md:w-1/2 lg:w-1/3">
      {children}
    </li>
  );
};
