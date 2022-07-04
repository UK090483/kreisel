import SanityImage from "@lib/SanityImage";
import Typo from "@components/Typography/Typography";
import * as React from "react";
import { ITestimonialItem } from "@components/Blocks/listingBlock/listingBlockQuery";
import clsx from "clsx";

interface ITestimonialListItemProps extends ITestimonialItem {
  index: number;
}

const TestimonialListItem: React.FunctionComponent<
  ITestimonialListItemProps
> = (props) => {
  const { text, name, position, image, children } = props;

  const hasImage = !!(image && image.url);

  return (
    <div
      className={clsx("grid   grid-cols-1  items-center  h-full ", {
        "lg:grid-cols-[2fr_400px]": hasImage,
      })}
    >
      <div className="flex flex-col md:p-12">
        <Typo bold={false} variant="h4" className="pt-6 ">
          Das sagen ehemalige Teilnehmer*innen:
        </Typo>
        <Typo bold={false} className="pt-6   h-full">
          {text}
        </Typo>
        {children}
      </div>

      {hasImage && (
        <div className=" mx-auto rounded-theme overflow-hidden  relative flex justify-center items-center   h-[320px] w-[320px] ">
          <SanityImage image={image} layout={"fill"} objectFit="cover" />
        </div>
      )}
    </div>
  );
};

export default TestimonialListItem;
