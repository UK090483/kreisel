import Carousel from "components/Molecules/Carousel/Carousel";
import Typo from "components/Atoms/Typography/Typography";
import Image, { ImageSrc, validateSrc } from "components/Atoms/Image";
import React from "react";
import clsx from "clsx";

export interface ITestimonialItemProps {
  text?: string | null;
  image?: ImageSrc;
  name?: string | null;
  position?: string | null;
  _id: string;
  bgColor: string;
  content: null | any;
}

interface ITestimonialListProps {
  items: ITestimonialItemProps[];
}

const TestimonialList: React.FC<ITestimonialListProps> = (props) => {
  const { items = [] } = props;

  if (items.length < 1) return null;

  return (
    <Carousel slides={1} slidesMobile={1}>
      {items.map((itemProps, index) => {
        const { image, text, name } = itemProps;
        const hasImage = validateSrc(image);
        return (
          <div
            key={index}
            className={clsx(
              "flex flex-wrap lg:flex-nowrap items-center px-10 lg:px-12"
            )}
          >
            <div
              className={clsx("w-full h-full", {
                "lg:mr-6": hasImage,
              })}
            >
              <Typo bold as="h4" space={false} className="">
                Das sagen ehemalige Teilnehmer*innen:
              </Typo>
              <Typo bold={false} className="h-full whitespace-pre-line  pt-6">
                {text}
              </Typo>

              <Label
                {...itemProps}
                classNames={clsx({ "hidden lg:block": hasImage })}
              />
            </div>

            {hasImage && (
              <div className="flex">
                <div className="shrink-0 relative mx-auto  flex h-24 w-24 lg:h-[320px] lg:w-[320px] items-center justify-center overflow-hidden rounded-theme ">
                  <Image
                    alt={`${name}`}
                    src={image}
                    fill
                    className="object-cover"
                  />
                </div>
                <Label {...itemProps} classNames=" lg:hidden ml-6" />
              </div>
            )}
          </div>
        );
      })}
    </Carousel>
  );
};

export default TestimonialList;

const Label = (props: ITestimonialItemProps & { classNames?: string }) => {
  const { name, position, classNames } = props;
  return (
    <div className={classNames}>
      <Typo bold space={false}>
        {name}
      </Typo>
      <Typo variant="body-s" space={false}>
        {position}
      </Typo>
    </div>
  );
};
