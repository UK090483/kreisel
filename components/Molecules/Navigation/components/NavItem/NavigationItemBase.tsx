import Svg from "components/Atoms/Svg";
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
        `block px-5 py-3  text-base leading-5 `,
        {
          "font-bold ": bold,
        },
        className
      )}
    >
      {children}
      {icon && (
        <Svg
          pathProps={{ strokeWidth: 3 }}
          size="s"
          className={`ml-1 transition-transform ${
            hover ? "translate-x-1 rotate-90 transform " : ""
          }`}
          icon="chevronRight"
        />
      )}
    </span>
  );
};

export default NavigationItemBase;
