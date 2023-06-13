import * as React from "react";

interface IFormErrorProps {
  errorMessage?: string;
}

export function FormError({ errorMessage }: IFormErrorProps) {
  if (!errorMessage) return null;
  return <p className="text-red">{errorMessage}</p>;
}
