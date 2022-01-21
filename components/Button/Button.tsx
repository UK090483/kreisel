import { Link } from "@components/Link";
import React from "react";

type ButtonProps = {
  onClick?: () => void;
  internalLink?: string | null;
  externalLink?: string;
  href?: string | null;
  external?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className = "",
    children,
    onClick = () => {},
    internalLink,
    href,
    external,
  } = props;

  if (href) {
    return (
      <Link
        onClick={() => {
          console.error("consol error");
        }}
        className="inline-block px-12 py-2 text-base rounded-full bg-primary whitespace-nowrap"
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
      className={`px-12 py-2 text-base rounded-full bg-primary whitespace-nowrap block w-full ${className}`}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
