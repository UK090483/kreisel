import List from "@components/Blocks/listingBlock/Listings/List";
import TestimonialList from "@components/Blocks/listingBlock/Listings/testimonials/TestimonialList";
import TherapistList from "@components/Blocks/listingBlock/Listings/therapist/TherapistList";
import React from "react";
import { ListingBlockProps } from "./listingBlockQuery";
import ListWrap from "./ListWrap";

const ListingBlock: React.FC<ListingBlockProps> = (props) => {
  const { bgColor, content, variation } = props;

  if (!props.items) return null;

  if (props.contentType === "testimonial") {
    return (
      <ListWrap space={false} bgColor={bgColor} content={content}>
        <TestimonialList items={props.items} />
      </ListWrap>
    );
  }

  if (props.contentType === "therapist") {
    return <TherapistList items={props.items} />;
  }

  return (
    <ListWrap bgColor={bgColor} content={content}>
      <List variation={variation} items={props.items} />
    </ListWrap>
  );
};

export default ListingBlock;
