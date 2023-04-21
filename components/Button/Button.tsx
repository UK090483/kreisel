import { Link } from "components/Link";
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

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = (props) => {
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
        className={`inline-block whitespace-nowrap rounded-full border-2 border-black px-6  py-1 text-center  text-base ${className}`}
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
      className={`w-full whitespace-nowrap rounded-full border-2  border-black px-12 py-2 text-base  disabled:opacity-60 ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
