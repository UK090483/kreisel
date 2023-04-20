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

const NavigationItemBase: React.FC<NavItemBaseProps> = ({
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
          className={` ml-1 h-4 w-4 transition-transform ${
            hover ? "translate-x-1 rotate-90 transform  " : ""
          }`}
          icon="chevronRight"
        />
      )}
    </span>
  );
};

export default NavigationItemBase;
