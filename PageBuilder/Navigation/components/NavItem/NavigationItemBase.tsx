import Svg from "components/Svg";
import clsx from "clsx";

export type NavItemBaseProps = {
  icon?: boolean;
  hover?: boolean;
  bold?: boolean;
  place?: "link" | "dropdown" | "header";
  props: { [k: string]: any };
  active: boolean;
  children?: React.ReactNode;
  className?: string;
};

// eslint-disable-next-line import/no-unused-modules
export const NavigationItemBase: React.FC<NavItemBaseProps> = ({
  children,
  icon,
  hover,
  bold,
  className,
}) => {
  return (
    <span
      data-testid="navBase"
      className={clsx(
        `block px-5 py-3  text-base leading-none `,
        {
          "font-bold ": bold,
        },
        className
      )}
    >
      {children}
      {icon && (
        <Svg
          className={` transition-transform ml-1 w-4 h-4 ${
            hover ? "transform rotate-90 translate-x-1  " : ""
          }`}
          icon="chevronRight"
        />
      )}
    </span>
  );
};

export default NavigationItemBase;
