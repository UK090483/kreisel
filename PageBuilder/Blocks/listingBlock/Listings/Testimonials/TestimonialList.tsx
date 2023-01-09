import React from "react";
import { ITestimonialItem } from "../../listingBlockQuery";
import Carousel from "components/Carousel/Carousel";
import Typo from "components/Typography/Typography";
import SanityImage from "lib/SanityImage";
import clsx from "clsx";

interface ITestimonialListProps {
  items: ITestimonialItem[];
}

const TestimonialList: React.FC<ITestimonialListProps> = (props) => {
  const { items = [] } = props;

  if (items.length < 1) return null;

  return (
    <Carousel slides={1} slidesMobile={1}>
      {items.map(({ image, text }, index) => {
        const hasImage = !!(image && image.url);
        return (
          <div
            key={index}
            className={clsx("grid   grid-cols-1  items-center  h-full ", {
              "lg:grid-cols-[2fr_400px]": hasImage,
            })}
          >
            <div className="flex flex-col md:p-12">
              <Typo bold={false} variant="h4" className="pt-6 ">
                Das sagen ehemalige Teilnehmer*innen:
              </Typo>
              <Typo bold={false} className="pt-6 whitespace-pre-line  h-full">
                {text}
              </Typo>
            </div>

            {hasImage && (
              <div className=" mx-auto rounded-theme overflow-hidden  relative flex justify-center items-center   h-[320px] w-[320px] ">
                <SanityImage image={image} layout={"fill"} objectFit="cover" />
              </div>
            )}
          </div>
        );
      })}
    </Carousel>
  );
};

export default TestimonialList;
