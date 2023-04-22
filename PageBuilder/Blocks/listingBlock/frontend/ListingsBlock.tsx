import List from "./Listings/List";
import PersonList from "./Listings/Persons/PersonList";
import TestimonialList from "./Listings/Testimonials/TestimonialList";
import TherapistList from "./Listings/Therapist/TherapistList";
import ListWrap from "./ListWrap";
import { ListingBlockProps } from "../listingBlock.query";
import React from "react";

const ListingBlock: React.FC<ListingBlockProps> = (props) => {
  const { variation, contentType, variant } = props;

  if (contentType === "therapist") {
    return (
      <ListWrap {...props}>
        <TherapistList />
      </ListWrap>
    );
  }
  if (!props.items) return null;

  if (contentType === "people") {
    return (
      <ListWrap {...props}>
        <PersonList items={props.items} />
      </ListWrap>
    );
  }

  if (contentType === "testimonial") {
    return (
      <ListWrap {...props}>
        <TestimonialList items={props.items} />
      </ListWrap>
    );
  }

  return (
    <ListWrap {...props}>
      <List variation={variation} {...props} items={props.items} />
    </ListWrap>
  );
};

export default ListingBlock;
