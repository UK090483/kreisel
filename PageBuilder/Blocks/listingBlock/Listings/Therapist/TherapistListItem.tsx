import React from "react";
import Typo from "@components/Typography/Typography";

import Avatar from "./Avatar";
import Link from "next/link";
import { useRouter } from "next/router";
import { TherapistResult } from "PageBuilder/Blocks/listingBlock/listingBlockQuery";

interface TherapistListItemProps extends TherapistResult {}

const TherapistListItem: React.FC<TherapistListItemProps> = (props) => {
  const { firstName, name, city, zipCode, description, _id, image } = props;

  const r = useRouter();
  const { query, asPath } = r;

  const baseUrl =
    query.slug && Array.isArray(query.slug)
      ? query.slug.map((i) => i.trim()).join("/")
      : "";

  return (
    <li className={`rounded-theme w-full   mb-2 p-0.5`}>
      <Link
        href={{ pathname: "/" + baseUrl, query: { therapeut: _id } }}
        scroll={false}
        shallow={true}
        className=" rounded-theme flex w-full items-center hover:bg-grey-light "
      >
        <Avatar
          className={`relative transition-all w-10 h-10 flex-shrink-0 rounded-theme overflow-hidden`}
          name={`${firstName} ${name}`}
          image={image}
        />

        <div className=" w-full px-6 ">
          <div className="flex-col md:flex-row flex w-full md:items-center md:justify-between ">
            <Typo space={false}>{`${firstName} ${name}`}</Typo>
            <Typo space={false}>{`${city || ""} ${zipCode || ""}`}</Typo>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default React.memo(TherapistListItem, (prev, next) => {
  return true;
});
