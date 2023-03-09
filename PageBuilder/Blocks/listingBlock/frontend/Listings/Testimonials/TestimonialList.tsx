import { ITestimonialItem } from "../../../listingBlock.query";
import Carousel from "components/Carousel/Carousel";
import Typo from "components/Typography/Typography";
import SanityImage from "PageBuilder/Image/frontend/SanityImage";
import React from "react";
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
            className={clsx("grid h-full  grid-cols-1 items-center ", {
              "lg:grid-cols-[2fr_400px]": hasImage,
            })}
          >
            <div className=" flex flex-col md:px-12">
              <Typo bold={false} variant="h4" className="pt-6 ">
                Das sagen ehemalige Teilnehmer*innen:
              </Typo>
              <Typo bold={false} className="h-full whitespace-pre-line  pt-6">
                {text}
              </Typo>
            </div>

            {hasImage && (
              <div className="relative mx-auto mt-12  flex h-[320px]  w-[320px] items-center justify-center overflow-hidden rounded-theme ">
                <SanityImage src={image} fill className=" object-cover" />
              </div>
            )}
          </div>
        );
      })}
    </Carousel>
  );
};

export default TestimonialList;
