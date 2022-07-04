import Typo from "@components/Typography/Typography";
import SanityImage from "@lib/SanityImage";
import type { ImageMetaResult } from "@lib/SanityImage/query";
// import ReactTooltip from "react-tooltip";

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
    <li className="flex flex-col items-center justify-center sm:min-w-[250px] w-1/2   sm:w-1/3 py-8 self-start">
      <Avatar image={avatar} title={name} subTitle={position}></Avatar>
      <div className="tooltip hidden" />

      {/* <button
        className="underline text-sm sm:text-base"
        data-tip
        data-for={_id}
      >
        MEHR
      </button> */}

      {/* <ReactTooltip
        overridePosition={(position) => {
          const wWidth = window.innerWidth;
          const needFitLeft = position.left < 0;
          const needFitRight = position.left + 280 > wWidth;
          const needFitTop = position.top < 0;
          let p = { ...position };
          if (needFitLeft) {
            p = { ...p, left: 20 };
          }
          if (needFitRight) {
            p = { ...p, left: wWidth - 300 };
          }
          if (needFitTop) {
            p = { ...p, top: 20 };
          }
          return p;
        }}
        id={_id}
        effect="float"
        multiline={true}
        className="tooltip"
      >
        {description}
      </ReactTooltip> */}
    </li>
  );
};

export default PersonListItem;
