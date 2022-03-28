import React from "react";

type CardBodyProps = {
  className?: string;
};

const CardBody: React.FC<CardBodyProps> = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export default CardBody;
