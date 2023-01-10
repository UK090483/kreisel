import List from "./Listings/List";
import PersonList from "./Listings/Persons/PersonList";
import TestimonialList from "./Listings/Testimonials/TestimonialList";
import TherapistList from "./Listings/Therapist/TherapistList";
import ListWrap from "./ListWrap";
import { ListingBlockProps } from "../listingBlock.query";
import React from "react";

const ListingBlock: React.FC<ListingBlockProps> = (props) => {
  const { variation } = props;

  if (!props.items) return null;

  if (props.contentType === "people") {
    return (
      <ListWrap {...props}>
        <PersonList items={props.items} />
      </ListWrap>
    );
  }

  if (props.contentType === "testimonial") {
    return (
      <ListWrap {...props}>
        <TestimonialList items={props.items} />
      </ListWrap>
    );
  }

  if (props.contentType === "therapist") {
    return <TherapistList items={props.items} />;
  }

  return (
    <ListWrap {...props}>
      <List variation={variation} items={props.items} />
    </ListWrap>
  );
};

export default ListingBlock;
