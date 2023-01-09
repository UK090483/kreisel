import React from "react";
import { ListingBlockProps } from "./listingBlockQuery";
import List from "./Listings/List";
import PersonList from "./Listings/Persons/PersonList";
import TestimonialList from "./Listings/Testimonials/TestimonialList";
import TherapistList from "./Listings/Therapist/TherapistList";
import ListWrap from "./ListWrap";

const ListingBlock: React.FC<ListingBlockProps> = (props) => {
  const {
    bgColor,
    content,
    variation,
    transitionTop,
    transitionBottom,
    topSpace,
    bottomSpace,
  } = props;

  if (!props.items) return null;

  if (props.contentType === "people") {
    return (
      <ListWrap
        bottomSpace={bottomSpace}
        topSpace={topSpace}
        transitionTop={transitionTop}
        transitionBottom={transitionBottom}
        bgColor={bgColor}
        content={content}
      >
        <PersonList items={props.items} />
      </ListWrap>
    );
  }

  if (props.contentType === "testimonial") {
    return (
      <ListWrap
        bottomSpace={bottomSpace}
        topSpace={topSpace}
        transitionTop={transitionTop}
        transitionBottom={transitionBottom}
        bgColor={bgColor}
        content={content}
      >
        <TestimonialList items={props.items} />
      </ListWrap>
    );
  }

  if (props.contentType === "therapist") {
    return <TherapistList items={props.items} />;
  }

  return (
    <ListWrap
      bottomSpace={bottomSpace}
      topSpace={topSpace}
      transitionTop={transitionTop}
      transitionBottom={transitionBottom}
      bgColor={bgColor}
      content={content}
    >
      <List variation={variation} items={props.items} />
    </ListWrap>
  );
};

export default ListingBlock;
