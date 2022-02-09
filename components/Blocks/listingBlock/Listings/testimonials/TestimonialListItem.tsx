import SanityImage from "@lib/SanityImage";
import { Section } from "@components/Section/Section";
import Typo from "@components/Typography/Typography";

import * as React from "react";
import { ITestimonialItem } from "@components/Blocks/listingBlock/listingBlockQuery";

interface ITestimonialListItemProps extends ITestimonialItem {}

const TestimonialListItem: React.FunctionComponent<
  ITestimonialListItemProps
> = (props) => {
  const { text, name, position, image } = props;

  return (
    <div className="grid  grid-cols-1 md:grid-cols-2  animate-fadeIn ">
      <div className=" flex flex-col py-12">
        <Typo bold={false} variant="h4" className="pt-6 ">
          Das sagen ehemalige Teilnehmer*innen
        </Typo>
        <Typo bold={false} variant="h2" className="pt-6 text-white  h-full">
          {text}
        </Typo>
        <Typo bold={false} space={false} variant="h4" className="pt-6 ">
          {name}
        </Typo>
        <Typo bold={false} className="pt-6 ">
          {position}
        </Typo>
      </div>

      <div className="relative overflow-hidden w-full aspect-w-1 aspect-h-1 ">
        <SanityImage image={image} objectFit="cover" />
      </div>
    </div>
  );
};

export default TestimonialListItem;
