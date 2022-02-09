import { Link } from "@components/Link";
import React from "react";

type ButtonProps = {
  onClick?: () => void;
  href?: string | null;
  external?: boolean;
  className?: string;
  type?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >["type"];
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className = "",
    children,
    onClick,
    href,
    external,
    type = "button",
    disabled = false,
  } = props;

  if (href) {
    return (
      <Link
        onClick={onClick}
        className={`inline-block px-12 py-2 text-center text-base rounded-full  border-2 border-black  whitespace-nowrap ${className}`}
        href={href}
        external={external}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-12 py-2 text-base rounded-full  whitespace-nowrap border-2 border-black disabled:opacity-60  w-full ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
