import React from "react";
import Typo from "@components/Typography/Typography";
import { TherapistResult } from "@services/pageBuilderService/Blocks/listingBlock/ListingsBlock";
import Avatar from "./Avatar";
import Link from "next/link";
import { useRouter } from "next/router";

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
    <li className={`rounded-3xl w-full  odd:bg-primary-light  mb-2 p-0.5`}>
      <Link
        passHref
        href={{ pathname: baseUrl, query: { therapeut: _id } }}
        scroll={false}
        shallow={true}
      >
        <a className=" rounded-3xl flex w-full items-center hover:ring-4  ring-primary ">
          <Avatar
            className={`relative transition-all ${"w-10 h-10"}  flex-shrink-0  rounded-3xl overflow-hidden`}
            name={`${firstName} ${name}`}
            image={image}
          />

          <div className=" w-full px-6 ">
            <div className="flex-col md:flex-row flex w-full md:items-center md:justify-between">
              <Typo space={false} bold>{`${firstName} ${name}`}</Typo>
              <Typo space={false}>{`${city || ""} ${zipCode || ""}`}</Typo>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default React.memo(TherapistListItem, (prev, next) => {
  return true;
});
