import * as React from "react";

interface IFormDescriptionProps {
  description?: string;
}

export function FormDescription({ description }: IFormDescriptionProps) {
  if (!description) return null;
  return <p className="text-sm ml-4">{description}</p>;
}
