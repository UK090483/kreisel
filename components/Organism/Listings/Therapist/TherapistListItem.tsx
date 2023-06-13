import Avatar from "./Avatar";
import Typo from "components/Atoms/Typography/Typography";
import { ImageSrc } from "components/Atoms/Image";
import Link from "components/Atoms/Link";
import React from "react";
import { useRouter } from "next/router";

export interface ITherapistListItemProps {
  _id: string;
  image?: ImageSrc;
  email?: string;
  firstName?: string;
  name?: string;
  city?: string;
  zipCode?: string;
  description?: string;
}

const TherapistListItem: React.FC<ITherapistListItemProps> = (props) => {
  const { firstName, name, city, zipCode, description, _id, image } = props;

  const r = useRouter();
  const { query, asPath } = r;

  const baseUrl =
    query.slug && Array.isArray(query.slug)
      ? query.slug.map((i) => i.trim()).join("/")
      : "";

  return (
    <li className={`mb-2 w-full rounded-theme p-0.5`}>
      <Link
        //@ts-ignore
        href={{ pathname: "/" + baseUrl, query: { therapist: _id } }}
        scroll={false}
        shallow={true}
        className=" flex w-full items-center rounded-theme hover:bg-grey-light "
      >
        <Avatar
          className={`relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-theme transition-all`}
          name={`${firstName} ${name}`}
          image={image}
        />

        <div className=" w-full px-6 ">
          <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between ">
            <Typo space={false}>{`${firstName} ${name}`}</Typo>
            <Typo space={false}>{`${city || ""} ${zipCode || ""}`}</Typo>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default TherapistListItem;
