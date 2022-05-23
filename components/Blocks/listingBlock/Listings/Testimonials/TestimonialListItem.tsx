import SanityImage from "@lib/SanityImage";
import Typo from "@components/Typography/Typography";

import * as React from "react";
import { ITestimonialItem } from "@components/Blocks/listingBlock/listingBlockQuery";
import Avatar from "@components/Avatar";

interface ITestimonialListItemProps extends ITestimonialItem {}

const TestimonialListItem: React.FunctionComponent<
  ITestimonialListItemProps
> = (props) => {
  const { text, name, position, image, children } = props;

  return (
    <div className="grid  grid-cols-1 lg:grid-cols-2  animate-fadeIn ">
      <div className=" flex flex-col p-12">
        <Typo bold={false} variant="h4" className="pt-6 ">
          Das sagen ehemalige Teilnehmer*innen
        </Typo>
        <Typo
          bold={false}
          variant="h2"
          className="pt-6 text-primary-light  h-full"
        >
          {text}
        </Typo>
        {children}
      </div>
      <div>
        <Avatar image={image} title={name} subTitle={position} />
      </div>
    </div>
  );
};

export default TestimonialListItem;
