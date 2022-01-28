import List from "@components/organisms/Listings/List";
import TestimonialList from "@components/organisms/Listings/testimonials/TestimonialList";
import TherapistList from "@components/organisms/Listings/therapist/TherapistList";
import React from "react";
import { ListingBlockProps } from "./listingBlockQuery";
import ListWrap from "./ListWrap";

const ListingBlock: React.FC<ListingBlockProps> = (props) => {
  const { bgColor, content, variation } = props;

  if (!props.items) return null;

  if (props.contentType === "testimonial") {
    return (
      <ListWrap bgColor={bgColor} content={content}>
        <TestimonialList items={props.items} />
      </ListWrap>
    );
  }

  if (props.contentType === "therapist") {
    return <TherapistList items={props.items} />;
  }

  return (
    <ListWrap bgColor={bgColor} content={content}>
      <List variation={variation} bgColor={bgColor} items={props.items} />
    </ListWrap>
  );
};

export default ListingBlock;
