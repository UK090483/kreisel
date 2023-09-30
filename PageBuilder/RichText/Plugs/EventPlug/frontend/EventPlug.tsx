"use client";

import { IEventPlugProps } from "../eventPlug.query";
import { Events } from "components";
import React from "react";

const EventPlug: React.FC<IEventPlugProps> = (props) => {
  const { category, filter, legende, showFilter } = props;

  return (
    <Events
      legende={legende}
      showFilter={showFilter}
      filter={filter}
      category={category}
    />
  );
};

export default EventPlug;
