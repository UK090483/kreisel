import clsx from "clsx";
import { Link } from "components/Link";
import Svg from "components/Svg";
import React from "react";

interface BaseButtonProps<T extends React.ElementType> {
  as?: T;
  children?: React.ReactNode;
}

type ButtonProps = {
  href?: string | null;
  external?: boolean;
  size?: "s" | "m";
};

const buttonStyle = {
  base: `inline-block whitespace-nowrap rounded-full bg-primary text-center`,
  size: {
    s: "text-sm px-3 py-1",
    m: "px-6 py-1 text-base font-bold",
  },
};

function Button<T extends React.ElementType = "button">(
  props: BaseButtonProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof BaseButtonProps<T>> &
    ButtonProps
) {
  const {
    className = "",
    children,
    onClick,
    href,
    external,
    disabled = false,
    size = "m",
    ...rest
  } = props;

  if (href) {
    return (
      <Link
        onClick={onClick}
        className={clsx(buttonStyle.base, buttonStyle.size[size], className, {
          "opacity-50": disabled,
        })}
        href={href}
        external={external}
        {...rest}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(buttonStyle.base, buttonStyle.size[size], className, {
        "opacity-50": disabled,
      })}
      {...rest}
    >
      {children}
    </button>
  );
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
        "pointer-events-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary text-font  shadow-theme sm:h-8 sm:w-8"
      )}
      {...rest}
    >
      {<Svg icon={icon} size="m" pathProps={{ strokeWidth: 2 }} />}
    </Component>
  );
}

export default Button;
