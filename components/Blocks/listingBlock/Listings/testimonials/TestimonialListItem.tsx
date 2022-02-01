import SanityImage from "@privateModules/SanityImage";
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
    <div className="grid  grid-cols-1 md:grid-cols-2 py-10 animate-fadeIn ">
      <div className="p-16 h-full flex flex-col">
        <Typo bold={false} variant="h4" className="pt-6 ">
          Das sagen ehemalige Teilnehmer*innen
        </Typo>
        <Typo
          bold={false}
          hand
          variant="h1"
          className="pt-6 text-white  h-full"
        >
          {text}
        </Typo>
        <Typo bold={false} space={false} variant="h4" className="pt-6 ">
          {name}
        </Typo>
        <Typo bold={false} className="pt-6 ">
          {position}
        </Typo>
      </div>

      <div className="relative rounded-theme overflow-hidden w-full aspect-w-1 aspect-h-1 ">
        <SanityImage image={image} objectFit="cover" />
      </div>
    </div>
  );
};

export default TestimonialListItem;