import List from "./DefaultList";
import PersonList from "./Persons/PersonList";
import TestimonialList, {
  ITestimonialItemProps,
} from "./Testimonials/TestimonialList";
import TherapistList from "./Therapist/TherapistList";
import ListWrap from "./ListWrap";

import { CardProps } from "./Card/Card";
import { IPersonListItemProps } from "./Persons/PersonListItem";
import { ISectionProps } from "components/Atoms/Section/Section";
import React from "react";

interface ListingBlockItemResult<Type, Card, Variant = undefined>
  extends ISectionProps {
  type?: "contentType" | "custom";
  contentType: Type;
  items?: Card[];
  content?: null | any;
  variant?: Variant;
  therapistFilter?: string | null;
}

type ListingProps =
  | ListingBlockItemResult<"page", CardProps, "card" | "smallCard">
  | ListingBlockItemResult<"people", IPersonListItemProps>
  | ListingBlockItemResult<"therapist", any>
  | ListingBlockItemResult<"testimonial", ITestimonialItemProps>
  | ListingBlockItemResult<"blog" | "article", CardProps>
  | ListingBlockItemResult<"custom", CardProps>;

const ListingBlock: React.FC<ListingProps> = (props) => {
  const { contentType, variant } = props;

  if (contentType === "therapist") {
    return (
      <ListWrap {...props}>
        <TherapistList
          offersInternship={props.therapistFilter === "offersInternship"}
        />
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
      <List variant={variant} {...props} items={props.items} />
    </ListWrap>
  );
};

export default ListingBlock;
