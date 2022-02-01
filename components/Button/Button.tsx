import { Link } from "@components/Link";
import React from "react";

type ButtonProps = {
  onClick?: () => void;
  internalLink?: string | null;
  externalLink?: string;
  href?: string | null;
  external?: boolean;
  className?: string;
  type?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >["type"];
};

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className = "",
    children,
    onClick = () => {},
    internalLink,
    href,
    external,
    type = "button",
  } = props;

  if (href) {
    return (
      <Link
        onClick={() => {
          console.error("consol error");
        }}
        className={`inline-block px-12 py-2 text-center text-base rounded-full bg-primary whitespace-nowrap ${className}`}
        href={href}
        external={external}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`px-12  py-2 text-base rounded-full bg-primary whitespace-nowrap  w-full ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
