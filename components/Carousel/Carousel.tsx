import Navigation from "./Navigation";
import { useSection } from "components/Section/SectionContext";
import clsx from "clsx";
import React, { useState } from "react";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

interface ICarouselProps {
  children: React.ReactElement[];
  slidesMobile?: number;
  slides?: number;
  spacing?: number;
  navigation?: boolean;
  testId?: string;
}

function Carousel(props: ICarouselProps) {
  const {
    children,
    slidesMobile = 1,
    slides = 1,
    spacing = 20,
    navigation = true,
  } = props;
  const { bg } = useSection();
  const [_currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: slides,
          spacing,
        },
      },
    },
    slides: {
      perView: slidesMobile,
      spacing,
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  return (
    <div
      className={clsx("relative", {
        "text-white ": ["dark-grey"].includes(bg || "no"),
      })}
    >
      <ul ref={sliderRef} className="keen-slider list-none items-center">
        {children.map((i, index) => {
          return React.cloneElement(
            { ...i, type: "li" },
            {
              className: clsx("keen-slider__slide", i.props?.className),
            }
          );
        })}
      </ul>
      {loaded && instanceRef.current && navigation && (
        <Navigation
          prev={() => instanceRef.current?.prev()}
          next={() => instanceRef.current?.next()}
        />
      )}
    </div>
  );
}

export default Carousel;
