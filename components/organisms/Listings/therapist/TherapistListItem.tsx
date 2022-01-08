import Typo from "@components/Typography/Typography";
import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import useQueryState, { useQueryStateActive } from "@hooks/useQueryState";
import { TherapistResult } from "@services/pageBuilderService/Blocks/listingBlock/ListingsBlock";
import Avatar from "./Avatar";

interface TherapistListItemProps extends TherapistResult {
  active: boolean;
  setActive: (id: string | null) => void;
}

const TherapistListItem: React.FC<TherapistListItemProps> = (props) => {
  const {
    firstName,
    name,
    city,
    zipCode,
    description,
    _id,
    image,
    active,
    setActive,
  } = props;

  const handleClick = () => {
    setActive(_id);
  };

  return (
    <li
      tabIndex={1}
      className={`rounded-3xl w-full flex  ${
        active ? " bg-primary" : ""
      } border-2`}
      onClick={handleClick}
      onFocus={handleClick}
    >
      <Avatar
        className={`relative transition-all ${
          active ? "w-40 h-40" : "w-20 h-20"
        }  flex-shrink-0  rounded-3xl overflow-hidden`}
        name={`${firstName} ${name}`}
        image={image}
      />

      <div className="p-4 w-full ">
        <div className="flex w-full items-center justify-between">
          <Typo space={false} bold>{`${firstName} ${name}`}</Typo>
          <Typo space={false}>{`${city} ${zipCode}`}</Typo>
        </div>
        <div
          className={` overflow-hidden transition-all  ${
            active ? "max-h-96" : "max-h-0"
          }`}
        >
          {description && <BlockContent blocks={description} />}
        </div>
      </div>
    </li>
  );
};

export default TherapistListItem;
