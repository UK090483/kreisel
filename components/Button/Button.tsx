import clsx from "clsx";
import { Link } from "components/Link";
import Svg from "components/Svg";
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

const buttonStyle = `inline-block whitespace-nowrap rounded-full bg-primary px-6 py-1 text-center text-base font-bold`;

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
        className={`${buttonStyle} ${className}`}
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
      className={`${buttonStyle} ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

interface BaseButtonProps<T extends React.ElementType> {
  as?: T;
  children?: React.ReactNode;
}

export function IconButton<T extends React.ElementType = "button">(
  props: BaseButtonProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof BaseButtonProps<T>> &
    Pick<React.ComponentProps<typeof Svg>, "icon">
) {
  const { children, className, icon, as, ...rest } = props;
  const Component = as || "button";

  return (
    <Component
      className={clsx(
        className,
        "pointer-events-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-theme sm:h-8 sm:w-8"
      )}
      {...rest}
    >
      {<Svg icon={icon} size="m" pathProps={{ strokeWidth: 3 }} />}
    </Component>
  );
}

export default Button;
